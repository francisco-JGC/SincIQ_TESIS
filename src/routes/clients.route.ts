import { Router } from 'express'
import { createClient, getClients } from '../controllers/clients.cotroller'
import { handleBadRequestResponse } from '../utils/handleHttpsResponse'
import { ICreateClient } from '../entities/client/types/add-client.interface'

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

export default router
