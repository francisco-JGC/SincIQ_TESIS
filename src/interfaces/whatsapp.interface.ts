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
  messages: Message[]
}

interface Message {
  from: string
  id: string
  timestamp: string
  type: string
  interactive: Interactive
}

interface Interactive {
  type: string
  list_reply: Listreply
}

interface Listreply {
  id: string
  title: string
}

interface Contact {
  profile: Profile
  wa_id: string
}

interface Profile {
  name: string
}

interface Metadata {
  display_phone_number: string
  phone_number_id: string
}
