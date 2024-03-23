import { Router } from 'express'
import {
  createClient,
  getClients,
  changeBotStatus,
  clearConversationsFromClient,
  setSeenConversationByIdClient
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

router.get('/', async (_req, res) => {
  return res.json(await getClients())
})

router.post('/change-bot-status', async (req, res) => {
  const { client_id, bot_status } = req.body as IActiveDesactiveBot

  if (!client_id || bot_status === undefined) {
    return res.json(
      handleBadRequestResponse(
        res,
        new Error('Por favor, envie los datos necesarios')
      )
    )
  }

  return res.json(await changeBotStatus(client_id, bot_status))
})

router.post('/clear-conversation', async (req, res) => {
  const { client_id } = req.body as IActiveDesactiveBot

  if (!client_id) {
    return res.json(
      handleBadRequestResponse(
        res,
        new Error('Por favor, envie los datos necesarios')
      )
    )
  }

  return res.json(await clearConversationsFromClient(client_id))
})

router.post('/seen-conversation', async (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
  const { client_id, state } = req.body as any

  if (!client_id) {
    return res.json(
      handleBadRequestResponse(
        res,
        new Error('Por favor, envie los datos necesarios')
      )
    )
  }

  return res.json(await setSeenConversationByIdClient(client_id, state))
})

export default router
