export interface IWhatsappReply {
  object: string
  entry: Entry[]
}

interface Entry {
  id: string
  changes: Change[]
}

interface Change {
  value: Value
  field: string
}

interface Value {
  messaging_product: string
  metadata: Metadata
  contacts: Contact[]
  messages: IMessage[]
  profile: any
}

export interface IMessage {
  from: string
  id: string
  created_at: string
  type: string
  interactive: IInteractive
  text: { body: string }
}

export interface IInteractive {
  type: string
  list_reply: Listreply
  button_reply: Buttonreply
}

interface Listreply {
  id: string
  title: string
}

interface Buttonreply {
  id: string
  title: string
}

interface Contact {
  profile: IProfile
  wa_id: string
}

export interface IProfile {
  name: string
}

interface Metadata {
  display_phone_number: string
  phone_number_id: string
}
