export interface IInteractiveButton {
  type: 'reply' | 'list_reply' | 'button_reply'
  reply: IButton
}

interface IButton {
  id: string
  title: string
}
