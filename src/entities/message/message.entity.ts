import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn
} from 'typeorm'
import { Conversation } from '../conversation/conversation.entity'

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  content: string

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date

  @Column()
  sender: string

  @Column()
  receiver: string

  @Column({ type: 'enum', enum: ['text', 'image'], nullable: true })
  type?: 'text' | 'image'

  @Column({ type: 'json', nullable: true })
  whatsapp_object?: any

  @ManyToOne(() => Conversation, (conversation) => conversation.messages)
  @JoinColumn({ name: 'conversation_id', referencedColumnName: 'id' })
  conversation: Conversation
}
