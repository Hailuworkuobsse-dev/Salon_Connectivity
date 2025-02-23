/*
  # Initial Schema for Salon Booking App

  1. New Tables
    - users (extends Supabase auth.users)
    - salons
    - services
    - appointments
    - bookings
    - reviews
    - payments
    - staff
    - notifications

  2. Security
    - Enable RLS on all tables
    - Add policies for each role (client, owner, staff, admin)
    
  3. Enums and Types
    - user_role
    - booking_status
    - payment_status
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enums
CREATE TYPE user_role AS ENUM ('client', 'owner', 'staff', 'admin');
CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'cancelled', 'completed');
CREATE TYPE payment_status AS ENUM ('pending', 'completed', 'failed', 'refunded');

-- Users table (extends auth.users)
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  full_name TEXT NOT NULL,
  phone TEXT,
  role user_role NOT NULL DEFAULT 'client',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Salons table
CREATE TABLE salons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID NOT NULL REFERENCES users(id),
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  contact_phone TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  status BOOLEAN DEFAULT true,
  description TEXT,
  logo_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Services table
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  salon_id UUID NOT NULL REFERENCES salons(id),
  name TEXT NOT NULL,
  description TEXT,
  duration INTEGER NOT NULL, -- in minutes
  price DECIMAL(10,2) NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Staff table
CREATE TABLE staff (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id),
  salon_id UUID NOT NULL REFERENCES salons(id),
  available_days INTEGER[], -- 0-6 for Sunday-Saturday
  available_hours JSONB, -- Store hours as ranges
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Bookings table
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID NOT NULL REFERENCES users(id),
  salon_id UUID NOT NULL REFERENCES salons(id),
  staff_id UUID NOT NULL REFERENCES staff(id),
  service_id UUID NOT NULL REFERENCES services(id),
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ NOT NULL,
  status booking_status NOT NULL DEFAULT 'pending',
  cancellation_reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Payments table
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id UUID NOT NULL REFERENCES bookings(id),
  amount DECIMAL(10,2) NOT NULL,
  status payment_status NOT NULL DEFAULT 'pending',
  transaction_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Reviews table
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID NOT NULL REFERENCES users(id),
  salon_id UUID NOT NULL REFERENCES salons(id),
  staff_id UUID REFERENCES staff(id),
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Notifications table
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  recipient_id UUID NOT NULL REFERENCES users(id),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE salons ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Policies

-- Users policies
CREATE POLICY "Users can read their own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Salons policies
CREATE POLICY "Anyone can view active salons"
  ON salons
  FOR SELECT
  TO authenticated
  USING (status = true);

CREATE POLICY "Owners can manage their salons"
  ON salons
  FOR ALL
  TO authenticated
  USING (owner_id = auth.uid());

-- Services policies
CREATE POLICY "Anyone can view active services"
  ON services
  FOR SELECT
  TO authenticated
  USING (is_active = true);

CREATE POLICY "Salon owners can manage services"
  ON services
  FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM salons
    WHERE salons.id = services.salon_id
    AND salons.owner_id = auth.uid()
  ));

-- Bookings policies
CREATE POLICY "Clients can view their bookings"
  ON bookings
  FOR SELECT
  TO authenticated
  USING (client_id = auth.uid());

CREATE POLICY "Staff can view their bookings"
  ON bookings
  FOR SELECT
  TO authenticated
  USING (staff_id IN (
    SELECT id FROM staff WHERE user_id = auth.uid()
  ));

CREATE POLICY "Salon owners can view all salon bookings"
  ON bookings
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM salons
    WHERE salons.id = bookings.salon_id
    AND salons.owner_id = auth.uid()
  ));

-- Notifications policies
CREATE POLICY "Users can view their notifications"
  ON notifications
  FOR SELECT
  TO authenticated
  USING (recipient_id = auth.uid());

-- Indexes for performance
CREATE INDEX idx_bookings_salon_date ON bookings(salon_id, start_time);
CREATE INDEX idx_bookings_staff_date ON bookings(staff_id, start_time);
CREATE INDEX idx_services_salon ON services(salon_id);
CREATE INDEX idx_staff_salon ON staff(salon_id);