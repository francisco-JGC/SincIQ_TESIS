export interface IGetMessage {
  text: (params: any) => string
  image: (params: any) => string
}

export const processGetMessage: IGetMessage = {
  text: (params) => params.text.body,
  image: (params) => params.image.caption
}
