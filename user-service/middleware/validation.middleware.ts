// import { Request, Response, NextFunction } from 'express';
// import { Schema } from 'joi';

// const createValidationMiddleware = (schema: Schema) => {
//   return (req: Request, res: Response, next: NextFunction): void => {
//     const { error } = schema.validate(req.body);
//     if (error) {
//       res.status(400).json({ error: error.details[0].message });
//     }
//     next();
//   };
// };

// export default createValidationMiddleware;