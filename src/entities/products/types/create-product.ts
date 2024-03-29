export interface ICreateProduct {
  name: string
  price: number
  gender: 'Masculino' | 'Femenino' | 'Unisex'
  description?: string
  category: string
  discount?: number
  quantity: number
  state: string
  visibility: boolean
  uploadImg1: string
  uploadImg2?: string
  uploadImg3?: string
}
