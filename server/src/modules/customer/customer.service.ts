import { getDb } from '../../db.ts';
import { Customer } from './customer.schema.ts';

/**
 * Service class for handling customer-related database operations
 */
export class CustomerService {
  /**
   * Retrieves a paginated list of customers with optional search filtering
   * 
   * @param page - The page number (1-indexed)
   * @param limit - Number of records per page
   * @param search - Optional search term to filter by first_name, last_name, or email
   * @returns Object containing customer data array and total count
   */
  static async getPaginatedCustomers(page: number, limit: number, search?: string) {
    // Get the database connection
    const db = await getDb();
    
    // Calculate the starting row position based on page and limit
    // E.g., page 2 with limit 10 = offset of 10 (skip first 10 rows)
    const offset = (page - 1) * limit;

    // Initialize base queries for fetching data and counting total records
    let query = 'SELECT * FROM customers';
    let countQuery = 'SELECT COUNT(*) as total FROM customers';
    const params: any[] = [];

    // Apply search filter if provided
    if (search) {
      // Create pattern with wildcards for partial matching
      const pattern = `%${search}%`;
      
      // Add WHERE clause to both queries to filter by name or email
      query += ' WHERE first_name LIKE ? OR last_name LIKE ? OR email LIKE ?';
      countQuery += ' WHERE first_name LIKE ? OR last_name LIKE ? OR email LIKE ?';
      
      // Add the search pattern for each field (3 times for 3 fields)
      params.push(pattern, pattern, pattern);
    }

    // Execute the query with pagination (LIMIT and OFFSET)
    const data = await db.all<Customer[]>(`${query} LIMIT ? OFFSET ?`, [...params, limit, offset]);
    
    // Get the total count of matching records
    const row = await db.get(countQuery, params);
    
    // Return paginated data with metadata
    return {
      data,
      total: row?.total || 0,
    };
  }
}