import express from 'express';
import userController from "../controllers/userController.js";
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/auth-user',userController.authUser)
router.post('/register-user',userController.register)
router.post('/save-password',protect,userController.savePassword)
router.get('/get-saved/:id',userController.getPassword)
router.post('/delete-saved',protect,userController.deleteSaved)
router.post('/logout',userController.logoutUser)

export default router;