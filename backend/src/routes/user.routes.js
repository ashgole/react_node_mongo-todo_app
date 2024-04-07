import { Router } from 'express'
import { refreshAccessToken, signin, signout, signup } from '../controllers/user.controller.js'
import { verifyJWT } from '../middlewares/auth.middleware.js'

const router = Router()

router.route('/signup').post(signup)
router.route('/signin').post(signin)

// secured routes
router.route("/signout").post(verifyJWT,signout)
router.route("/refresh-token").post(refreshAccessToken)

export default router