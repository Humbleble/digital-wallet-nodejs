import { Request, Response } from 'express'; // Import for Request and Response types
import User from '../models/user.model'; // Import User interface and type
import validator from '../utils/validator'; // Import validation functions
import logger from '../utils/logger'; // Import logger
import { sign } from 'jsonwebtoken'; // Import sign function from jwt

interface RegisterRequest extends Request {
  body: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  };
}

interface LoginRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}

class AuthenticationController {
  public async register(req: RegisterRequest, res: Response) {
    try {
      const { error } = validator.validateUser(req.body);
      // Validate request body
      if (error) res.status(400).json({ error: error.details[0].message });
      
      // Destructure email, password, firstName, and lastName from request body
      const { email, password, firstName, lastName } = req.body;
      
      // Check if user already exists
      let user = await User.findOne({ email });
      if (user) return res.status(400).json({ error: 'User already exists' });
      
      // Create new user instance
      user = new User({ email, password, firstName, lastName });
      await user.save();
  
      // Create JWT token
      const jwtSecret = process.env.JWT_SECRET;
      if (!jwtSecret) {
        throw new Error('JWT_SECRET is not defined');
      }
      
      // Return user data
      res.status(201).json({ user: { id: user._id, email: user.email, firstName: user.firstName, lastName: user.lastName } });
    } catch (error) {
      logger.error('Error in user registration:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  
  public async login(req: LoginRequest, res: Response) {
    try {
      // Validate request body
      const { error } = validator.validateLogin(req.body);
      if (error) return res.status(400).json({ error: error.details[0].message });
      
      // Destructure email and password from request body
      const { email, password } = req.body;
      
      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ error: 'Invalid email' });
      
      // Check if password is correct
      const isMatch = await user.checkPassword(password);
      if (!isMatch) return res.status(400).json({ error: 'Invalid password' });
  
      // Create JWT token
      const jwtSecret = process.env.JWT_SECRET;
      if (!jwtSecret) {
        throw new Error('JWT_SECRET is not defined');
      }
      
      // Return JWT token and user data
      res.json({ token: sign({ id: user._id }, jwtSecret, { expiresIn: '1d' }), user: { id: user._id, email: user.email, firstName: user.firstName, lastName: user.lastName } });
    } catch (error) {
      logger.error('Error in user login:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default new AuthenticationController();