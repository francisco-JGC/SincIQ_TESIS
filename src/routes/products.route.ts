import { Router } from 'express'

import { handleBadRequestResponse } from '../utils/handleHttpsResponse'
import {
  addProduct,
  getProducts,
  deleteProductById,
  getProductById
} from '../controllers/products.controller'
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

router.delete('/:id', async (req, res) => {
  const { id } = req.params

  if (!id) {
    return handleBadRequestResponse(res, 'No se proporcionó el ID del producto')
  }

  return res.json(await deleteProductById(Number(id)))
})

router.get('/:id', async (req, res) => {
  const { id } = req.params

  if (!id) {
    return handleBadRequestResponse(res, 'No se proporcionó el ID del producto')
  }

  return res.json(await getProductById(Number(id)))
})

export default router
