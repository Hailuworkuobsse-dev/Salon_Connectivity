import { supabase } from '../lib/supabase';

export async function getSalons() {
  const { data, error } = await supabase.from('salons').select('*');

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

import { useQuery } from '@tanstack/react-query';

export function useSalons() {
  return useQuery({
    queryKey: ['salons'],
    queryFn: getSalons,
  });
}
