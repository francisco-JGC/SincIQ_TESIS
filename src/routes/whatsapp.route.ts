import { Router, type Request, type Response } from 'express'
import {
  verifyToken,
  receivedMessage
} from '../controllers/whatsapp.controller'

const router = Router()

router.get('/', (_req: Request, res: Response) => {
  res.send('Hello World!')
})

router.get('/verify_token', verifyToken)

router.post('/received_message', receivedMessage)

export default router
