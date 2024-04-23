import { Router } from 'express'
import { createInstantOrder } from '../controllers/orders.controller'
import { ICreateInstantOrder } from '../entities/order/types/create-order'
import {
  handleBadRequestResponse,
  handleOkResponse
} from '../utils/handleHttpsResponse'

const router = Router()

router.post('/', async (req, res) => {
  const { order } = req.body as { order: ICreateInstantOrder }

  if (
    !order.client_name ||
    !order.id_products ||
    !order.quantity ||
    !order.total_price
  ) {
    return res.json(
      handleBadRequestResponse({}, new Error('Faltan datos de la orden'))
    )
  }

  return handleOkResponse(await createInstantOrder(order))
})

export default router
