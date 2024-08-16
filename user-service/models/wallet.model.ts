// import { Schema, model, Document } from 'mongoose';

// interface IWallet extends Document {
//   user: Schema.Types.ObjectId;
//   balance: number;
//   currency: string;
//   stripeCustomerId: string;
//   createdAt: Date;
// }

// const walletSchema = new Schema<IWallet>({
//   user: {
//     type: Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
//   balance: {
//     type: Number,
//     default: 0,
//     min: 0
//   },
//   currency: {
//     type: String,
//     default: 'USD'
//   },
//   stripeCustomerId: {
//     type: String,
//     required: true
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now
//   }
// });

// const Wallet = model<IWallet>('Wallet', walletSchema);

// export default Wallet;