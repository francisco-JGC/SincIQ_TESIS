import { AppDataSource } from '../config/database.config'
import { Category } from '../entities/categories/category.entity'
import { ICreateCategory } from '../entities/categories/types/create-category'
import {
  handleBadRequestResponse,
  handleOkResponse
} from '../utils/handleHttpsResponse'

export const createCategory = async ({
  name,
  description
}: ICreateCategory) => {
  try {
    const categoryExist = await getCategoryByName(name)

    if (categoryExist.success) {
      return handleBadRequestResponse(
        {},
        'Ya existe una categoría con ese nombre'
      )
    }

    const category = new Category()
    category.name = name
    category.description = description

    const result = await AppDataSource.getRepository(Category).save(category)

    if (!result) {
      return handleBadRequestResponse({}, 'Hubo un error al crear la categoría')
    }

    return handleOkResponse(result)
  } catch (error: any) {
    return handleBadRequestResponse({}, error.message)
  }
}

export const getCategories = async () => {
  try {
    const categories = await AppDataSource.getRepository(Category).find()

    if (!categories) {
      return handleBadRequestResponse({}, 'No se encontraron categorías')
    }

    return handleOkResponse(categories)
  } catch (error: any) {
    return handleBadRequestResponse({}, error.message)
  }
}

export const getCategoryById = async (id: number) => {
  try {
    const category = await AppDataSource.getRepository(Category).findOne({
      where: { id }
    })

    if (!category) {
      return handleBadRequestResponse({}, 'No se encontró la categoría')
    }

    return handleOkResponse(category)
  } catch (error: any) {
    return handleBadRequestResponse({}, error.message)
  }
}

export const updateCategory = async (id: number, data: ICreateCategory) => {
  try {
    const category = await AppDataSource.getRepository(Category).findOne({
      where: { id }
    })

    if (!category) {
      return handleBadRequestResponse({}, 'No se encontró la categoría')
    }

    category.name = data.name
    category.description = data.description

    const result = await AppDataSource.getRepository(Category).save(category)

    if (!result) {
      return handleBadRequestResponse(
        {},
        'Hubo un error al actualizar la categoría'
      )
    }

    return handleOkResponse(result)
  } catch (error: any) {
    return handleBadRequestResponse({}, error.message)
  }
}

export const deleteCategory = async (id: number) => {
  try {
    const category = await AppDataSource.getRepository(Category).findOne({
      where: { id }
    })

    if (!category) {
      return handleBadRequestResponse({}, 'No se encontró la categoría')
    }

    const result = await AppDataSource.getRepository(Category).delete({
      id
    })

    if (!result) {
      return handleBadRequestResponse(
        {},
        'Hubo un error al eliminar la categoría'
      )
    }

    return handleOkResponse(result)
  } catch (error: any) {
    return handleBadRequestResponse({}, error.message)
  }
}

export const getCategoryByName = async (name: string) => {
  try {
    const category = await AppDataSource.getRepository(Category).findOne({
      where: { name }
    })

    if (!category) {
      return handleBadRequestResponse({}, 'No se encontró la categoría')
    }

    return handleOkResponse(category)
  } catch (error: any) {
    return handleBadRequestResponse({}, error.message)
  }
}
