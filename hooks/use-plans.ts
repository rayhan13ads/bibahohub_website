'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchPlans } from '@/lib/api';

export function usePlans() {
  return useQuery({
    queryKey: ['plans'],
    queryFn: fetchPlans,
    staleTime: 1000 * 60 * 60,
  });
}
