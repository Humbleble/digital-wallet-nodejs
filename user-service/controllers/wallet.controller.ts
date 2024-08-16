// import { Request, Response } from 'express';
// import WalletService from '../services/wallet.service';
// import validator from '../utils/validator';
// import logger from '../utils/logger';

// // Extend the Request interface to include the user property
// interface AuthenticatedRequest extends Request {
//   user: {
//     id: string;
//     email: string;
//   };
// }

// // interface for request body
// interface WalletCreationRequest {
//   userId: string;
//   email: string;
//   initialBalance: number;
// }

// interface TransactionRequest {
//   amount: number;
//   paymentMethodId?: string;
//   toUserId?: string;
//   destinationAccount?: string;
//   type: 'deposit' | 'transfer' | 'withdraw';
// }

// export class WalletController {

//   static async createWallet(req: AuthenticatedRequest, res: Response) {
//     try {
//       const { error } = validator.validateWalletCreation(req.body as WalletCreationRequest);
//       if (error) return res.status(400).json({ error: error.details[0].message });

//       const { initialBalance } = req.body as WalletCreationRequest;
//       const userId = req.user.id;

//       const result = await WalletService.createWallet(userId, req.user.email, initialBalance);
//       res.status(201).json(result);
//     } catch (error) {
//       logger.error('Error creating wallet:', error);
//       res.status(500).json({ error: error.message });
//     }
//   }

//   static async deposit(req: AuthenticatedRequest, res: Response) {
//     try {
//       const { error } = validator.validateTransaction({ ...req.body, type: 'deposit' } as TransactionRequest);
//       if (error) return res.status(400).json({ error: error.details[0].message });

//       const { amount, paymentMethodId } = req.body as TransactionRequest;
//       const userId = req.user.id;

//       const result = await WalletService.deposit(userId, amount, paymentMethodId || '');
//       res.json(result);
//     } catch (error) {
//       logger.error('Error depositing funds:', error);
//       res.status(500).json({ error: error.message });
//     }
//   }

//   static async transfer(req: AuthenticatedRequest, res: Response) {
//     try {
//       const { error } = validator.validateTransaction({ ...req.body, type: 'transfer' } as TransactionRequest);
//       if (error) return res.status(400).json({ error: error.details[0].message });

//       const { toUserId, amount } = req.body as TransactionRequest;
//       const fromUserId = req.user.id;

//       const result = await WalletService.transfer(fromUserId, toUserId || '', amount);
//       res.json(result);
//     } catch (error) {
//       logger.error('Error transferring funds:', error);
//       res.status(500).json({ error: error.message });
//     }
//   }

//   static async withdraw(req: AuthenticatedRequest, res: Response) {
//     try {
//       const { error } = validator.validateTransaction({ ...req.body, type: 'withdraw' } as TransactionRequest);
//       if (error) return res.status(400).json({ error: error.details[0].message });

//       const { amount, destinationAccount } = req.body as TransactionRequest;
//       const userId = req.user.id;

//       const result = await WalletService.withdraw(userId, amount, destinationAccount || '');
//       res.json(result);
//     } catch (error) {
//       logger.error('Error withdrawing funds:', error);
//       res.status(500).json({ error: error.message });
//     }
//   }

//   static async getBalance(req: AuthenticatedRequest, res: Response) {
//     try {
//       const userId = req.user.id;
//       const result = await WalletService.getBalance(userId);
//       res.json(result);
//     } catch (error) {
//       logger.error('Error getting balance:', error);
//       res.status(500).json({ error: error.message });
//     }
//   }

//   static async getTransactionHistory(req: AuthenticatedRequest, res: Response) {
//     try {
//       const userId = req.user.id;
//       const result = await WalletService.getTransactionHistory(userId);
//       res.json(result);
//     } catch (error) {
//       logger.error('Error getting transaction history:', error);
//       res.status(500).json({ error: error.message });
//     }
//   }
// }