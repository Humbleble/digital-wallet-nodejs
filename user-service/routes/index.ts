import express, { Router } from 'express';
import authRoutes from './auth.routes';
// import walletRoutes from './wallet.routes';
// import stripeRoutes from './stripe.routes';

const router: Router = express.Router();

// Define the routes and link them to the router
router.use('/auth', authRoutes);
// router.use('/wallet', walletRoutes);
// router.use('/stripe', stripeRoutes);

export default router;