import express from "express"
import { test,updateUser,deleteUser } from "../controllers/user.controller.js"
import { verifyUser } from "../utils/verifyUser.js"

const router = express.Router()

router.get('/',test)
router.post('/updateUser/:id', verifyUser, updateUser)
router.delete('/deleteUser/:id', verifyUser, deleteUser)

export default router