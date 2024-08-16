// import { Request, Response } from 'express';
// import { StripeService } from '../services/stripe.service';
// import logger from '../utils/logger';
// import validator from '../utils/validator';

// // Extend the Request interface to include the user property
// interface CustomRequest extends Request {
// 	user: {
// 		stripeCustomerId: string;
// 	};
// }

// const initStripeService = (): StripeService => {
// 	const stripeSecretKey = process.env.STRIPE_SECRET_KEY as string;
// 	return new StripeService();
// };

// export const createPaymentMethod = async (req: CustomRequest, res: Response): Promise<void> => {
// 	try {
// 		const { type, card } = req.body;

// 		if (type !== 'card' || !card) {
// 			res.status(400).json({ error: 'Invalid payment method details' });
// 			return;
// 		}

// 		const stripeService = initStripeService();
// 		const paymentMethod = await stripeService.createPaymentMethod(type, card);
// 		const customerId = req.user.stripeCustomerId;  // Assuming this is stored with the user
// 		await stripeService.attachPaymentMethodToCustomer(paymentMethod.id, customerId);

// 		res.json({ paymentMethod });
// 	} catch (error) {
// 		logger.error('Error creating payment method:', error);
// 		res.status(500).json({ error: (error as Error).message });
// 	}
// };

// export const getPaymentMethods = async (req: CustomRequest, res: Response): Promise<void> => {
// 	try {
// 		const customerId = req.user.stripeCustomerId;  // Assuming this is stored with the user
// 		const stripeService = initStripeService();
// 		const paymentMethods = await stripeService.listCustomerPaymentMethods(customerId);
// 		res.json({ paymentMethods });
// 	} catch (error) {
// 		logger.error('Error getting payment methods:', error);
// 		res.status(500).json({ error: (error as Error).message });
// 	}
// };

// export const createPaymentIntent = async (req: CustomRequest, res: Response): Promise<void> => {
// 	try {
// 		const { error } = validator.validateAmount(req.body.amount);
// 		if (error) {
// 			res.status(400).json({ error: error.details[0].message });
// 			return;
// 		}

// 		const stripeService = initStripeService();
// 		const paymentIntent = await stripeService.createPaymentIntent(req.body.amount, 'usd', req.user.stripeCustomerId);

// 		res.json({ paymentIntent });
// 	} catch (error) {
// 		logger.error('Error creating payment intent:', error);
// 		res.status(500).json({ error: (error as Error).message });
// 	}
// };

// export class StripeController {

// 	static createPaymentMethod(req: Request, res: Response) {

// 		// implementation of createPaymentMethod

// 	}

// 	static getPaymentMethods(req: Request, res: Response) {

// 		// implementation of getPaymentMethods

// 	}

// };