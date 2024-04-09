import { Router } from 'express'
import {  getUsers, refreshAccessToken, signin, signout, signup } from '../controllers/user.controller.js'
import { verifyJWT } from '../middlewares/auth.middleware.js'
import { addTodo, deleteTodo, getTodos } from '../controllers/todo.controller.js'

const router = Router()

router.route('/signup').post(signup)
router.route('/signin').post(signin)
router.route('/getusers').get(getUsers)

// secured routes
router.route("/signout").post(verifyJWT,signout)
router.route("/refresh-token").post(refreshAccessToken)

router.route("/addtodo").post(addTodo)
router.route("/gettodos").post(getTodos)
router.route("/deletetodo").post(deleteTodo)


export default router