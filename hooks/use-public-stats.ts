'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchPublicStats } from '@/lib/api';

export function usePublicStats() {
  return useQuery({
    queryKey: ['public-stats'],
    queryFn: fetchPublicStats,
    staleTime: 1000 * 60 * 5, // 5 minutes, matches server-side revalidate: 300
  });
}
