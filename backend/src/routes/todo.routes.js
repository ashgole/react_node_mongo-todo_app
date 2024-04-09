import { Router } from 'express'
import { verifyJWT } from '../middlewares/auth.middleware.js'
import { addTodo, deleteTodo, getTodos } from '../controllers/todo.controller.js'

const router = Router()

router.route("/addtodo").post(verifyJWT,addTodo)
router.route("/gettodos").post(verifyJWT,getTodos)
router.route("/deletetodo").post(verifyJWT,deleteTodo)


export default router