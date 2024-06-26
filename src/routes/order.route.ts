import { Router } from 'express'
import {
  createInstantOrder,
  getSaleOrders
} from '../controllers/orders.controller'
import { ICreateInstantOrder } from '../entities/order/types/create-order'
import { handleBadRequestResponse } from '../utils/handleHttpsResponse'

const router = Router()

router.post('/', async (req, res) => {
  const order = req.body as ICreateInstantOrder

  if (!order.id_products || !order.total_price) {
    return res.json(
      handleBadRequestResponse({}, new Error('Faltan datos de la orden'))
    )
  }

  return res.json(await createInstantOrder(order))
})

router.get('/sales', async (_req, res) => {
  return res.json(await getSaleOrders())
})
export default router
