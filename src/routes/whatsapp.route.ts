import { Router } from 'express'
import {
  verifyToken,
  receivedMessage,
  showLog,
  sendMessage
} from '../controllers/whatsapp.controller'

const router = Router()

router.get('/', verifyToken)

router.post('/', receivedMessage)

router.get('/show_log', showLog)

router.post('/send_message', sendMessage)

export default router
