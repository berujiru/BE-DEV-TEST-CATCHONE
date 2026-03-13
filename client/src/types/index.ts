import type { components, paths } from './generated/backend';

/**
 * Mapping Generated Paths to Simple Types
 * Instead of writing out the full path in every component, we alias them here.
 * If the API changes, we only update this file.
 */

// Model Types from Schemas
export type Customer = components['schemas']['Customer'];

// Response Types
export type CustomerListResponse = 
  paths['/api/customers']['get']['responses'][200]['content']['application/json'];

export type CustomerErrorResponse = 
  paths['/api/customers']['get']['responses'][500]['content']['application/json'];

// Query Parameters Type
export type CustomerQueryParams = 
  paths['/api/customers']['get']['parameters']['query'];