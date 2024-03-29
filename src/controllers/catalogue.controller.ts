import { AppDataSource } from '../config/database.config'
import { Catalogue } from '../entities/catalogue/catalogue.entity'
import {
  handleBadRequestResponse,
  handleOkResponse
} from '../utils/handleHttpsResponse'

export const createCatalogue = async ({
  name,
  description,
  banner
}: Catalogue) => {
  try {
    const catalogueExist = await AppDataSource.getRepository(Catalogue).findOne(
      {
        where: { name }
      }
    )
    const existCatalogue = await getCatalogues()

    if (existCatalogue.success) {
      return handleBadRequestResponse({}, 'No puedes crear más de 1 catálogos')
    }

    const catalogueData = new Catalogue()

    if (catalogueExist) {
      catalogueData.id = catalogueExist.id
    }

    catalogueData.name = name
    catalogueData.description = description
    catalogueData.banner = banner

    const result =
      await AppDataSource.getRepository(Catalogue).save(catalogueData)

    return handleOkResponse(result)
  } catch (error: any) {
    return handleBadRequestResponse({}, error.message)
  }
}

export const getCatalogues = async () => {
  try {
    const catalogues = await AppDataSource.getRepository(Catalogue).find()

    if (!catalogues) {
      return handleBadRequestResponse({}, 'No hay catálogos')
    }

    return handleOkResponse(catalogues)
  } catch (error: any) {
    return handleBadRequestResponse({}, error.message)
  }
}
