import { Product } from '../entities/products/products.entity'
import { AppDataSource } from '../config/database.config'
import {
  handleBadRequestResponse,
  handleOkResponse
} from '../utils/handleHttpsResponse'
import { ICreateProduct } from '../entities/products/types/create-product'
import { getCategoryByName } from './categories.controller.'

export const addProduct = async (product: ICreateProduct) => {
  try {
    const productRepository = await getCategoryByName(product.category)
    if (!productRepository.success) {
      return handleBadRequestResponse({}, 'La categoría no existe')
    }

    const newProduct = new Product()
    newProduct.name = product.name
    newProduct.price = Number(product.price)
    newProduct.gender = product.gender
    newProduct.description = product.description
    newProduct.category = productRepository.data as any
    newProduct.discount = Number(product.discount)
    newProduct.quantity = Number(product.quantity)
    newProduct.state = product.state
    newProduct.visibility = product.visibility
    newProduct.images_url = [
      product.uploadImg1,
      product.uploadImg2 || '',
      product.uploadImg3 || ''
    ]

    const result = await AppDataSource.getRepository(Product).save(newProduct)

    if (!result) {
      return handleBadRequestResponse({}, 'Hubo un error al crear el producto')
    }

    return handleOkResponse(result)
  } catch (error: any) {
    return handleBadRequestResponse({}, error.message)
  }
}

export const getProducts = async () => {
  try {
    const products = await AppDataSource.getRepository(Product).find({
      relations: ['category']
    })

    return handleOkResponse(products)
  } catch (error: any) {
    return handleBadRequestResponse({}, error.message)
  }
}

export const deleteProductById = async (id: number) => {
  try {
    const product = await AppDataSource.getRepository(Product).findOne({
      where: { id }
    })

    if (!product) {
      return handleBadRequestResponse({}, 'El producto no existe')
    }

    const result = await AppDataSource.getRepository(Product).delete(id)

    if (!result) {
      return handleBadRequestResponse(
        {},
        'Hubo un error al eliminar el producto'
      )
    }

    return handleOkResponse(result)
  } catch (error: any) {
    return handleBadRequestResponse({}, error.message)
  }
}

export const getProductById = async (id: number) => {
  try {
    const product = await AppDataSource.getRepository(Product).findOne({
      where: { id },
      relations: ['category']
    })

    if (!product) {
      return handleBadRequestResponse({}, 'El producto no existe')
    }

    return handleOkResponse(product)
  } catch (error: any) {
    return handleBadRequestResponse({}, error.message)
  }
}

export const updateProductById = async (
  id: number,
  product: ICreateProduct
) => {
  try {
    const productRepository = await getCategoryByName(product.category)
    if (!productRepository.success) {
      return handleBadRequestResponse({}, 'La categoría no existe')
    }

    const productToUpdate = await AppDataSource.getRepository(Product).findOne({
      where: { id }
    })

    if (!productToUpdate) {
      return handleBadRequestResponse({}, 'El producto no existe')
    }

    productToUpdate.name = product.name
    productToUpdate.price = Number(product.price)
    productToUpdate.gender = product.gender
    productToUpdate.description = product.description
    productToUpdate.category = productRepository.data as any
    productToUpdate.discount = Number(product.discount)
    productToUpdate.quantity = Number(product.quantity)
    productToUpdate.state = product.state
    productToUpdate.visibility = product.visibility
    productToUpdate.images_url = [
      product.uploadImg1,
      product.uploadImg2 || '',
      product.uploadImg3 || ''
    ]

    const result =
      await AppDataSource.getRepository(Product).save(productToUpdate)

    if (!result) {
      return handleBadRequestResponse(
        {},
        'Hubo un error al actualizar el producto'
      )
    }

    return handleOkResponse(result)
  } catch (error: any) {
    return handleBadRequestResponse({}, error.message)
  }
}
