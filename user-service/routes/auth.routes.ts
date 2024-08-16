import { Router } from 'express';
import AuthenticationController from '../controllers/auth.controller';

// Create a new router instance
const router = Router();

// Define the routes and link them to controller methods
router.post('/register', (req, res) => AuthenticationController.register(req, res));
router.post('/login', (req, res) => AuthenticationController.login(req, res));

export default router;