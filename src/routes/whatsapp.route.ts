import { Router } from 'express'
import {
  verifyToken,
  receivedMessage,
  sendText
} from '../controllers/whatsapp.controller'

const router = Router()

router.get('/', verifyToken)

router.post('/', receivedMessage)

router.post('/send_message', sendText)

export default router
