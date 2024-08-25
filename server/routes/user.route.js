import express from 'express';
import { signup , signin , signout , getUserProfile, updateUserProfile} from '../controllers/user.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';
const router=express.Router();

router.post('/',signin);
router.post('/signin',signin);
router.post('/signup',signup);
router.get('/signout',signout);
router.route('/profile').get(verifyToken,getUserProfile).post(verifyToken,updateUserProfile)

export default router;