import { Router } from 'express';
import { getCustomers } from './customer.controller.js';

const router = Router();
/**
 * @openapi
 * /api/customers:
 *   get:
 *     summary: Retrieve a paginated list of customers with optional search
 *     description: Returns paginated customer records. Supports searching by first name, last name, or email.
 *     tags:
 *       - Customers
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number (1-indexed)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of records per page
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by first name, last name, or email (partial match)
 *     responses:
 *       200:
 *         description: Successfully retrieved paginated customers
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       first_name:
 *                         type: string
 *                       last_name:
 *                         type: string
 *                       email:
 *                         type: string
 *                       gender:
 *                         type: string
 *                       ip_address:
 *                         type: string
 *                       company:
 *                         type: string
 *                       city:
 *                         type: string
 *                       title:
 *                         type: string
 *                       website:
 *                         type: string
 *                 meta:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                       description: Total count of matching records (across all pages)
 *                     page:
 *                       type: integer
 *                       description: Current page number
 *                     limit:
 *                       type: integer
 *                       description: Records per page
 *                     last_page:
 *                       type: integer
 *                       description: Total number of pages
 *               example:
 *                 data:
 *                   - id: 1
 *                     first_name: "Laura"
 *                     last_name: "Richards"
 *                     email: "lrichards0@reverbnation.com"
 *                     gender: "Female"
 *                     ip_address: "81.192.7.99"
 *                     company: "Meezzy"
 *                     city: "Kallithéa"
 *                     title: "Biostatistician III"
 *                     website: "https://intel.com/aliquam/lacus/morbi/quis.png"
 *                   - id: 2
 *                     first_name: "Margaret"
 *                     last_name: "Mendoza"
 *                     email: "mmendoza1@sina.com.cn"
 *                     gender: "Female"
 *                     ip_address: "193.204.172.141"
 *                     company: "Skipfire"
 *                     city: "Jiashi"
 *                     title: "VP Marketing"
 *                     website: "http://printfriendly.com/in/lectus/pellentesque/at/nulla.jpg"
 *                 meta:
 *                   total: 1000
 *                   page: 1
 *                   limit: 2
 *                   last_page: 500
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *               example:
 *                 error: "Failed to fetch customers"
 */
router.get('/', getCustomers);

export default router;