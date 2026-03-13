import { getDb } from '../../db.ts';
import { Customer } from './customer.schema.ts';

export class CustomerService {
  static async getPaginatedCustomers(page: number, limit: number, search?: string) {
    const db = await getDb();
    const offset = (page - 1) * limit;

    let query = 'SELECT * FROM customers';
    let countQuery = 'SELECT COUNT(*) as total FROM customers';
    const params: any[] = [];

    if (search) {
      const pattern = `%${search}%`;
      query += ' WHERE first_name LIKE ? OR last_name LIKE ? OR email LIKE ?';
      countQuery += ' WHERE first_name LIKE ? OR last_name LIKE ? OR email LIKE ?';
      params.push(pattern, pattern, pattern);
    }

    const data = await db.all<Customer[]>(`${query} LIMIT ? OFFSET ?`, [...params, limit, offset]);
    const row = await db.get(countQuery, params);
    
    return {
      data,
      total: row?.total || 0,
    };
  }
}