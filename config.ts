import dotenv from 'dotenv';

dotenv.config();

interface Config {
  port: number;
  mongoURI: string;
  jwtSecret: string;
  stripeSecretKey: string;
}

const config: Config = {
  port: parseInt(process.env.PORT as string, 10) || 3000,
  mongoURI: process.env.MONGO_URI as string,
  jwtSecret: process.env.JWT_SECRET as string,
  stripeSecretKey: process.env.STRIPE_SECRET_KEY as string
};

export default config;