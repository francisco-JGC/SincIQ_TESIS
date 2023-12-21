import { Router } from 'express'
import {
  verifyToken,
  receivedMessage,
  showLog
} from '../controllers/whatsapp.controller'

const router = Router()

router.get('/', verifyToken)

router.post('/', receivedMessage)

router.get('/show_log', showLog)

export default router
