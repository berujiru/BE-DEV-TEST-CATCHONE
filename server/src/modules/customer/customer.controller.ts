import { Request, Response } from 'express';
import { CustomerService } from './customer.service.js';

export const getCustomers = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const search = req.query.search as string;

    const { data, total } = await CustomerService.getPaginatedCustomers(page, limit, search);

    res.json({
      data,
      meta: {
        total,
        page,
        limit,
        last_page: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Controller Error:', error);
    res.status(500).json({ error: 'Failed to fetch customers' });
  }
};