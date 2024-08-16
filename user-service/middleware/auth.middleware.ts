// import { Request, Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';
// import IUser from '../models/user.model';
// import User from '../models/user.model';
// import logger from '../utils/logger';

// interface DecodedToken {
//   id: string;
// }

// interface CustomRequest extends Request {
//   user?: typeof IUser;
// }

// const authenticateJWT = async (req: CustomRequest, res: Response, next: NextFunction) => {
//   try {
//     const authHeader = req.header('Authorization');
//     if (!authHeader) {
//       return res.status(401).json({ error: 'Access denied. No token provided.' });
//     }

//     const token = authHeader.split(' ')[1];
//     if (!token) {
//       return res.status(401).json({ error: 'Access denied. Invalid token format.' });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET!) as unknown as DecodedToken;
//     const user = await User.findById(decoded.id).select('-password');

//     if (!user) {
//       return res.status(401).json({ error: 'Invalid token. User not found.' });
//     }

//     req.user = user as unknown as typeof IUser;
//     next();
//   } catch (error) {
//     logger.error('Authentication error:', error);
//     if (error.name === 'JsonWebTokenError') {
//       return res.status(401).json({ error: 'Invalid token.' });
//     }
//     if (error.name === 'TokenExpiredError') {
//       return res.status(401).json({ error: 'Token expired.' });
//     }
//     res.status(500).json({ error: 'Internal server error.' });
//   }
// };

// export default authenticateJWT;