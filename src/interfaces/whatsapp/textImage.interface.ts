export interface IMessageImage {
  from: string
  id: string
  timestamp: string
  type: string
  image: Image
}

export interface Image {
  caption: string
  mime_type: string
  sha256: string
  id: string
}
