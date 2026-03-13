import { Router } from 'express';
import customerRoutes from './modules/customer/customer.routes.js';
// import employerRoutes from './modules/employer/employer.routes.js';

const router = Router();

// Health Check (Bonus points for reliability)
router.get('/health', (req, res) => res.json({ status: 'ok' }));

// Module Routes
router.use('/customers', customerRoutes);

export default router;