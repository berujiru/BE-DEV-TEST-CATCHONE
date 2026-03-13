import client from '../../../api/openapi-client';
import type { CustomerListResponse, CustomerQueryParams } from '../../../types';

/**
 * Fetches a paginated list of customers.
 * * @param params - The query parameters including page, limit, and search.
 * @returns The typed response from the backend.
 * @throws The error object if the request fails (handled by TanStack Query).
 */
export const getCustomers = async (params: CustomerQueryParams): Promise<CustomerListResponse> => {
  // client.GET is fully typed based on your backend.d.ts
  const { data, error } = await client.GET('/api/customers', {
    params: {
      query: {
        page: params?.page,
        limit: params?.limit,
        search: params?.search,
      },
    },
  });

  // If the server returns a 4xx or 5xx, 'error' will be populated.
  // The global middleware will show a toast, but we throw here so 
  // TanStack Query enters the 'error' state.
  if (error) throw error;

  return data as CustomerListResponse;
};