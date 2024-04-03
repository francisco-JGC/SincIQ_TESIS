import { Router } from 'express'

import { handleBadRequestResponse } from '../utils/handleHttpsResponse'
import { addProduct, getProducts } from '../controllers/products.controller'
import { ICreateProduct } from '../entities/products/types/create-product'

const router = Router()

router.post('/', async (req, res) => {
  const product: ICreateProduct = req.body

  if (!product) {
    return handleBadRequestResponse(
      res,
      'No se proporcionaron datos del producto'
    )
  }

  return res.json(await addProduct(product))
})

router.get('/', async (_req, res) => {
  return res.json(await getProducts())
})

export default router
