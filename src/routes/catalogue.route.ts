import { Router } from 'express'

import {
  createOrUpdateCatalogue,
  getCatalogues
} from '../controllers/catalogue.controller'
import { handleBadRequestResponse } from '../utils/handleHttpsResponse'

const router = Router()

router.post('/', async (req, res) => {
  const { name, description, banner, id, address, location } = req.body

  if (!name) {
    return res.json(
      handleBadRequestResponse(res, new Error('El nombre es requerido'))
    )
  }

  return res.json(
    await createOrUpdateCatalogue({
      name,
      description,
      banner,
      id,
      address,
      location
    } as any)
  )
})

router.get('/', async (_req, res) => {
  return res.json(await getCatalogues())
})

export default router
