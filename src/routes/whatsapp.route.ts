import { Router, type Request, type Response } from 'express'
import { verifyToken } from '../controllers/whatsapp.controller'

const router = Router()

router.get('/', (_req: Request, res: Response) => {
  res.send('Hello World!')
})

router.get('/verify_token', verifyToken)

router.post('/received_message', (_req: Request, res: Response) => {
  res.send('Hello World!')
})

export default router
