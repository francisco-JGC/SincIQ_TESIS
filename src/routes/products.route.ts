import { Router } from 'express'

import { handleBadRequestResponse } from '../utils/handleHttpsResponse'
import { addProduct } from '../controllers/products.controller'
import { ICreateProduct } from '../entities/products/types/create-product'

const router = Router()

router.post('/', async (req, res) => {
  console.log('POST /products')
  console.log('req.body', req.body)
  const product: ICreateProduct = req.body

  if (!product) {
    return handleBadRequestResponse(
      res,
      'No se proporcionaron datos del producto'
    )
  }

  return res.json(await addProduct(product))
})

export default router
