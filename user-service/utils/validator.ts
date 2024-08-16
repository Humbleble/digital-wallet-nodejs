import Joi, { ValidationResult } from 'joi';

interface IUser {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

interface ILoginData {
  email: string;
  password: string;
}

interface IWalletCreationData {
  userId: string;
  email: string;
  initialBalance?: number;
}

interface ITransaction {
  type: 'deposit' | 'withdraw' | 'transfer';
  amount: number;
  fromUserId?: string;
  toUserId?: string;
  currency?: string;
}

const validator = {
  // Define validation schema for user registration
  validateUser(user: IUser): ValidationResult {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
      firstName: Joi.string().min(2).max(50).required(),
      lastName: Joi.string().min(2).max(50).required()
    });
    return schema.validate(user);
  },

  // Define validation schema for user login
  validateLogin(data: ILoginData): ValidationResult {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required()
    });
    return schema.validate(data);
  },

  // Define validation schema for wallet creation
  validateWalletCreation(data: IWalletCreationData): ValidationResult {
    const schema = Joi.object({
      userId: Joi.string().required(),
      email: Joi.string().required(),
      initialBalance: Joi.number().min(0).default(0)
    });
    return schema.validate(data);
  },

  // Define validation schema for transaction
  validateTransaction(transaction: ITransaction): ValidationResult {
    const schema = Joi.object({
      type: Joi.string().valid('deposit', 'withdraw', 'transfer').required(),
      amount: Joi.number().positive().required(),
      fromUserId: Joi.string().when('type', { is: 'transfer', then: Joi.required() }),
      toUserId: Joi.string().when('type', { is: 'transfer', then: Joi.required() }),
      currency: Joi.string().default('USD')
    });
    return schema.validate(transaction);
  },

  // Define validation schema for amount
  validateAmount(amount: number): ValidationResult {
    return Joi.number().positive().validate(amount);
  },

  // Define validation schema for user ID
  validateId(id: string): ValidationResult {
    return Joi.string().required().validate(id);
  },

  // Define validation schema for email
  validateEmail(email: string): ValidationResult {
    return Joi.string().email().required().validate(email);
  }
};

export default validator;