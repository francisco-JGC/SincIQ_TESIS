import { Router } from 'express'
import {
  createClient,
  getClients,
  changeBotStatus
} from '../controllers/clients.cotroller'
import { handleBadRequestResponse } from '../utils/handleHttpsResponse'
import { ICreateClient } from '../entities/client/types/add-client.interface'
import { IActiveDesactiveBot } from '../entities/client/types/active-desactive-bot'

const router = Router()

router.post('/', async (req, res) => {
  const { username, phone_number } = req.body as ICreateClient

  if (!username || !phone_number) {
    return res.json(
      handleBadRequestResponse(res, new Error('No client data provided'))
    )
  }

  return res.json(await createClient(username, phone_number))
})

router.get('/', getClients)

router.post('/active-desactive-bot', async (req, res) => {
  const { client_id, bot_status } = req.body as IActiveDesactiveBot

  if (!client_id || bot_status === undefined) {
    return res.json(
      handleBadRequestResponse(
        res,
        new Error('Por favor, envie os dados corretos')
      )
    )
  }

  return res.json(await changeBotStatus(client_id, bot_status))
})

export default router
