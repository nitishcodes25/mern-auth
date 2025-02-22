import express from 'express'
import { signin, signup, googlesignin } from '../controllers/auth.controller.js'

const router = express.Router()

router.post('/signup',signup)
router.post('/signin',signin)
router.post('/google',googlesignin)

export default router