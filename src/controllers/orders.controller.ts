import { Order } from '../entities/order/order.entity'
import { Client } from '../entities/client/clients.entity'
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

    const response = await AppDataSource.getRepository(Order).save(newOrder)

    console.log(response)
    return handleOkResponse(newOrder)
  } catch (error: any) {
    return handleBadRequestResponse({}, error.message)
  }
}

export const getSaleOrders = async () => {
  try {
    const orders = await AppDataSource.getRepository(Order).find({
      where: { state: 'completed' },
      relations: ['products']
    })
    const product = await AppDataSource.getRepository(Product).find()
    const client = await AppDataSource.getRepository(Client).find()

    const total_sales = orders
      .map((sale) => sale.total_price)
      .reduce((acc, curr) => acc + curr, 0)

    const total_products = product.length
    const total_clients = client.length

    const income = {
      total_sales,
      total_products,
      total_clients
    }

    return handleOkResponse({ orders, income })
  } catch (error: any) {
    return handleBadRequestResponse({}, error.message)
  }
}
