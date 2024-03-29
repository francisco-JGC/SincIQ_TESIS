import { Router } from 'express'

import {
  createCatalogue,
  getCatalogues
} from '../controllers/catalogue.controller'
import { handleBadRequestResponse } from '../utils/handleHttpsResponse'

const router = Router()

router.post('/', async (req, res) => {
  const { name, description, banner } = req.body

  if (!name) {
    return res.json(
      handleBadRequestResponse(res, new Error('No catalogue data provided'))
    )
  }

  return res.json(await createCatalogue({ name, description, banner } as any))
})

router.get('/', async (_req, res) => {
  return res.json(await getCatalogues())
})

export default router
