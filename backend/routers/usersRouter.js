import express from 'express'
const router = express.Router()

import protect from '../middlewares/authMiddleware.js'

/**
 * Routes
 * - POST /api/users/        - Register new user    
 * - POST /api/users/auth    - Authenticate user and get token
 * - POST /api/users/logout  - Logout user and clear cookie
 * - GET  /api/users/profile - Get user profile
 * - PUT  /api/users/profile - Update user profile
 */
import { 
    registerUser, 
    authUser, 
    logoutUser, 
    getUserProfile, 
    updateUserProfile
} from '../controllers/usersController.js'


router.post('/', registerUser)
router.post('/auth', authUser)

router.post('/logout', logoutUser)
// router.post('/logout', protect, logoutUser)

/**
 * Use chain methods 
 */
// router.get('/profile', protect, getUserProfile)
// router.put('/profile', protect, updateUserProfile)
//////////////////////////////////////////////////////
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)


export default router