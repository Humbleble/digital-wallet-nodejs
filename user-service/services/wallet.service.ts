// import ITransaction from '../models/transaction.model';
// import IUser from '../models/user.model';
// import User from '../models/user.model';
// import { StripeService } from './stripe.service';

// interface IWallet {
//   balance: number;
//   stripeCustomerId: string;
// }

// interface ICreateWalletResponse {
//   success: boolean;
//   wallet: IWallet;
// }

// interface IDepositResponse {
//   success: boolean;
//   transaction: typeof ITransaction;
//   newBalance: number;
// }

// interface ITransferResponse {
//   success: boolean;
//   transaction: typeof ITransaction;
//   fromBalance: number;
//   toBalance: number;
// }

// interface IWithdrawResponse {
//   success: boolean;
//   transaction: typeof ITransaction;
//   newBalance: number;
// }

// interface IGetBalanceResponse {
//   success: boolean;
//   balance: number;
// }

// interface IGetTransactionHistoryResponse {
//   success: boolean;
//   transactions: typeof ITransaction[];
// }

// class WalletService {
//   private stripeService: typeof StripeService;

//   constructor() {
//     this.stripeService = StripeService;
//   }

//   async createWallet(userId: string, email: string, initialBalance: number): Promise<ICreateWalletResponse> {
//     const user: IUser | null = await User.findById(userId);
//     if (!user) {
//       throw new Error('User not found');
//     }
//     if (user.wallet) {
//       throw new Error('Wallet already exists for this user');
//     }
    
//     const customer = await this.stripeService.createCustomer(email);
//     user.wallet = { balance: 0, stripeCustomerId: customer.id };
//     await user.save();
    
//     return { success: true, wallet: user.wallet };
//   }

//   async deposit(userId: string, amount: number, paymentMethodId: string): Promise<IDepositResponse> {
//     const user: IUser | null = await User.findById(userId);
//     if (!user || !user.wallet) {
//       throw new Error('Wallet not found');
//     }
    
//     try {
//       const paymentIntent = await this.stripeService.createPaymentIntent(amount, 'usd', user.wallet.stripeCustomerId);
//       const confirmedPayment = await this.stripeService.confirmPaymentIntent(paymentIntent.id, paymentMethodId);
      
//       if (confirmedPayment.status === 'succeeded') {
//         user.wallet.balance += amount;
//         await user.save();
        
//         const transaction = new Transaction({
//           type: 'deposit',
//           userId,
//           amount,
//           timestamp: new Date()
//         });
//         await transaction.save();
        
//         return { success: true, transaction, newBalance: user.wallet.balance };
//       } else {
//         throw new Error('Payment failed');
//       }
//     } catch (error: any) {
//       console.error('Deposit failed:', error);
//       throw new Error('Deposit failed: ' + error.message);
//     }
//   }

//   async transfer(fromUserId: string, toUserId: string, amount: number): Promise<ITransferResponse> {
//     const fromUser: IUser | null = await User.findById(fromUserId);
//     const toUser: IUser | null = await User.findById(toUserId);
    
//     if (!fromUser || !fromUser.wallet || !toUser || !toUser.wallet) {
//       throw new Error('One or both wallets not found');
//     }
    
//     if (fromUser.wallet.balance < amount) {
//       throw new Error('Insufficient funds');
//     }
    
//     fromUser.wallet.balance -= amount;
//     toUser.wallet.balance += amount;
    
//     await fromUser.save();
//     await toUser.save();
    
//     const transaction = new Transaction({
//       type: 'transfer',
//       fromUserId,
//       toUserId,
//       amount,
//       timestamp: new Date()
//     });
//     await transaction.save();
    
//     return { 
//       success: true, 
//       transaction, 
//       fromBalance: fromUser.wallet.balance, 
//       toBalance: toUser.wallet.balance 
//     };
//   }

//   async withdraw(userId: string, amount: number, destinationAccount: string): Promise<IWithdrawResponse> {
//     const user: IUser | null = await User.findById(userId);
//     if (!user || !user.wallet) {
//       throw new Error('Wallet not found');
//     }
    
//     if (user.wallet.balance < amount) {
//       throw new Error('Insufficient funds');
//     }
    
//     try {
//       await this.stripeService.createPayout(amount, 'usd', destinationAccount);
      
//       user.wallet.balance -= amount;
//       await user.save();
      
//       const transaction = new Transaction({
//         type: 'withdraw',
//         userId,
//         amount,
//         destinationAccount,
//         timestamp: new Date()
//       });
//       await transaction.save();
      
//       return { success: true, transaction, newBalance: user.wallet.balance };
//     } catch (error: any) {
//       console.error('Withdrawal failed:', error);
//       throw new Error('Withdrawal failed: ' + error.message);
//     }
//   }

//   async getBalance(userId: string): Promise<IGetBalanceResponse> {
//     const user: IUser | null = await User.findById(userId);
//     if (!user || !user.wallet) {
//       throw new Error('Wallet not found');
//     }
    
//     return { success: true, balance: user.wallet.balance };
//   }

//   async getTransactionHistory(userId: string): Promise<IGetTransactionHistoryResponse> {
//     const transactions: ITransaction[] = await Transaction.find({
//       $or: [
//         { userId: userId },
//         { fromUserId: userId },
//         { toUserId: userId }
//       ]
//     }).sort({ timestamp: -1 });
    
//     return { success: true, transactions };
//   }
// }

// export default new WalletService();