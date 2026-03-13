import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { getCustomers } from '../services/customer';
import type { CustomerQueryParams } from '../../../types';

/**
 * Custom hook for managing the Customer list state.
 * * @param params - The current state of filters and pagination.
 */
export const useCustomers = (params: CustomerQueryParams) => {
  return useQuery({
    // The queryKey acts as a cache key.
    // If params.page or params.search changes, TanStack Query 
    // automatically triggers a new fetch.
    queryKey: ['customers', params],
    
    // Calls our service
    queryFn: () => getCustomers(params),

    /**
     * placeholderData: keepPreviousData is a TanStack v5 feature.
     * It prevents the UI from "jumping" or showing a blank loading screen 
     * when switching pages, keeping the old data visible until the new data arrives.
     */
    placeholderData: keepPreviousData,

    // Optimization: Consider data fresh for 30 seconds to reduce network noise
    staleTime: 1000 * 30,
  });
};