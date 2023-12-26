import { Router } from 'express'
import {
  verifyToken,
  receivedMessage,
  sendMessage
} from '../controllers/whatsapp.controller'

const router = Router()

router.get('/', verifyToken)

router.post('/', receivedMessage)

router.post('/send_message', sendMessage)

export default router
