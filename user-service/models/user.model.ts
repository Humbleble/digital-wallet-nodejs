import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

// Re-add when transactions are implemented
// interface IWallet extends Document {
//   balance: number;
//   stripeCustomerId: string;
// }

// const walletSchema = new Schema<IWallet>({
//   balance: {
//     type: Number,
//     default: 0,
//     min: 0
//   },
//   stripeCustomerId: {
//     type: String,
//     required: true
//   }
// }, { _id: false }); // Disable _id for subdocument

// Define user interface
interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  // wallet: IWallet;
  checkPassword(candidatePassword: string): Promise<boolean>;
}

// Define user schema
const userSchema = new Schema<IUser>({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  }
  // wallet: {
  //   type: walletSchema,
  //   required: true
  // }
});

// Hash password before saving to database
userSchema.pre<IUser>('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Password comparison method for login
userSchema.methods.checkPassword = async function(candidatePassword: string): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Create user model
const User = model<IUser>('User', userSchema);

export default User;