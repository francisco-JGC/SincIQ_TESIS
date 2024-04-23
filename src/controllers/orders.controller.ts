import { Order } from '../entities/order/order.entity'
import { Client } from '../entities/client/clients.entity'
import { Product } from '../entities/products/products.entity'
import { AppDataSource } from '../config/database.config'
import {
  handleBadRequestResponse,
  handleOkResponse
} from '../utils/handleHttpsResponse'
import { ICreateInstantOrder } from '../entities/order/types/create-order'

export const createInstantOrder = async (order: ICreateInstantOrder) => {
  try {
    const newOrder = new Order()
    newOrder.client_name = order.client_name
    newOrder.quantity = order.quantity
    newOrder.state = 'completed'
    newOrder.total_price = order.total_price

    for (const id of order.id_products) {
      const product = await AppDataSource.getRepository(Product).findOne({
        where: { id }
      })

      if (!product) {
        return handleBadRequestResponse({}, 'Producto no encontrado')
      }

      if (product.quantity < order.quantity) {
        return handleBadRequestResponse({}, 'No hay suficiente stock')
      }

      newOrder.products.push(product)
    }

    await AppDataSource.getRepository(Order).save(newOrder)

    return handleOkResponse(newOrder)
  } catch (error: any) {
    return handleBadRequestResponse({}, error.message)
  }
}
