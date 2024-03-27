import { Router } from 'express'

import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory
} from '../controllers/categories.controller.'

import { handleBadRequestResponse } from '../utils/handleHttpsResponse'
import { ICreateCategory } from '../entities/products/types/category/create-category'

const router = Router()

router.post('/', async (req, res) => {
  const { name, description } = req.body as ICreateCategory

  if (!name) {
    return res.json(
      handleBadRequestResponse(res, new Error('No category data provided'))
    )
  }

  return res.json(await createCategory({ name, description }))
})

router.get('/', async (_req, res) => {
  return res.json(await getCategories())
})

router.put('/:id', async (req, res) => {
  const { name, description } = req.body as ICreateCategory
  const { id } = req.params

  if (!name) {
    return res.json(
      handleBadRequestResponse(res, new Error('No category data provided'))
    )
  }

  return res.json(await updateCategory(Number(id), { name, description }))
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params

  return res.json(await deleteCategory(Number(id)))
})

export default router
