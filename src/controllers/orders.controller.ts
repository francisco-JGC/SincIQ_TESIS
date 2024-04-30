import { Order } from '../entities/order/order.entity'
// import { Client } from '../entities/client/clients.entity'
import { Product } from '../entities/products/products.entity'
import { AppDataSource } from '../config/database.config'
import {
  handleBadRequestResponse,
  handleOkResponse
} from '../utils/handleHttpsResponse'
import { ICreateInstantOrder } from '../entities/order/types/create-order'
import { createClient } from './clients.cotroller'

export const createInstantOrder = async (order: ICreateInstantOrder) => {
  try {
    const newOrder = new Order()
    newOrder.client_name = order.client_name || ''
    newOrder.phone_number = order.phone_number || ''
    newOrder.state = 'completed'
    newOrder.total_price = order.total_price

    if (order.client_name && order.phone_number) {
      const client = await createClient(order.client_name, order.phone_number)
      newOrder.client = client.data as any
    }

    newOrder.products = []

    for (const id of order.id_products) {
      const product = await AppDataSource.getRepository(Product).findOne({
        where: { id }
      })

      if (!product) {
        return handleBadRequestResponse({}, 'Producto no encontrado')
      }

      if (product.quantity === 0) {
        return handleBadRequestResponse({}, 'Producto sin stock')
      }

      newOrder.products.push(product)
    }

    await AppDataSource.getRepository(Order)
      .createQueryBuilder()
      .insert()
      .into(Order)
      .values(newOrder)
      .execute()

    return handleOkResponse(newOrder)
  } catch (error: any) {
    return handleBadRequestResponse({}, error.message)
  }
}
