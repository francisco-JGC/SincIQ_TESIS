import { Router, type Request, type Response } from 'express'
import {
  verifyToken,
  receivedMessage,
  showLog
} from '../controllers/whatsapp.controller'

const router = Router()

router.get('/', (_req: Request, res: Response) => {
  res.send('Hello World!')
})

router.get('/verify_token', verifyToken)

router.post('/received_message', receivedMessage)

router.get('/show_log', showLog)

export default router
