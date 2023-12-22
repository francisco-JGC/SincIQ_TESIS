export interface IResponseHTTP<T> {
  status: number
  message: string
  success: boolean
  data?: T | T[]
}

export const handleOkResponse = <T>(data: T): IResponseHTTP<T> => {
  return {
    status: 200,
    message: 'OK',
    success: true,
    data
  }
}

export const handleBadRequestResponse = <T>(
  data: T,
  error: Error
): IResponseHTTP<T> => {
  return {
    status: 400,
    message: error.message,
    success: false,
    data
  }
}
