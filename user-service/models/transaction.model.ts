// import { Schema, model, Document } from 'mongoose';

// interface ITransaction extends Document {
//   type: 'deposit' | 'withdraw' | 'transfer';
//   amount: number;
//   currency: string;
//   fromWallet?: Schema.Types.ObjectId;
//   toWallet?: Schema.Types.ObjectId;
// }

// const transactionSchema = new Schema<ITransaction>({
//   type: {
//     type: String,
//     enum: ['deposit', 'withdraw', 'transfer'],
//     required: true
//   },
//   amount: {
//     type: Number,
//     required: true,
//     min: 0
//   },
//   currency: {
//     type: String,
//     default: 'USD'
//   },
//   fromWallet: {
//     type: Schema.Types.ObjectId,
//     ref: 'Wallet',
//     required: function (this: ITransaction) { return this.type === 'transfer'; }
//   },
//   toWallet: {
//     type: Schema.Types.ObjectId,
//     ref: 'Wallet'
//   }
// });

// const Transaction = model<ITransaction>('Transaction', transactionSchema);

// export default Transaction;