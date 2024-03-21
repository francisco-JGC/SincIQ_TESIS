import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Column
} from 'typeorm'
import { User } from '../user/user.entity'
import { Client } from '../client/clients.entity'
import { Message } from '../message/message.entity'

@Entity()
export class Conversation {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => User, (user) => user.conversations)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User

  @ManyToOne(() => Client, (client) => client.conversations)
  @JoinColumn({ name: 'client_id', referencedColumnName: 'id' })
  client: Client

  @Column()
  system: 'system' | 'user'

  @OneToMany(() => Message, (message) => message.conversation)
  messages: Message[]

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date
}
