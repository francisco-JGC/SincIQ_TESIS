import { Router } from 'express'
import { registerUser } from '../controllers/auth-facebook.controller'

const router = Router()

router.post('/', async (req, res) => {
  res.json(await registerUser(req))
})

export default router
