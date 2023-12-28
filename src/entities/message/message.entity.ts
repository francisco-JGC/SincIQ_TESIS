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

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date

  @Column()
  sender: string

  @Column()
  receiver: string

  @ManyToOne(() => Conversation, (conversation) => conversation.messages)
  @JoinColumn({ name: 'conversation_id', referencedColumnName: 'id' })
  conversation: Conversation
}
