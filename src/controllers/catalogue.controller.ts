import { AppDataSource } from '../config/database.config'
import { Catalogue } from '../entities/catalogue/catalogue.entity'
import {
  handleBadRequestResponse,
  handleOkResponse
} from '../utils/handleHttpsResponse'

export const createOrUpdateCatalogue = async ({
  id,
  name,
  description,
  banner
}: Catalogue) => {
  try {
    let catalogue = await AppDataSource.getRepository(Catalogue).findOne({
      where: { id }
    })

    if (catalogue) {
      catalogue.name = name
      catalogue.description = description
      catalogue.banner = banner
    } else {
      catalogue = new Catalogue()
      catalogue.name = name
      catalogue.description = description
      catalogue.banner = banner
    }

    const result = await AppDataSource.getRepository(Catalogue).save(catalogue)
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
