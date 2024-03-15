import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  Unique
} from 'typeorm'
import { Order } from '../order/order.entity'

import { Conversation } from '../conversation/conversation.entity'

@Entity('client')
@Unique(['phone_number'])
export class Client {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  username: string

  @Column()
  phone_number: string

  @Column({ nullable: true })
  address?: string

  @Column({ nullable: true })
  image_url?: string

  @Column({ default: true, nullable: true })
  bot_status?: boolean

  @OneToMany(() => Order, (order) => order.client)
  orders?: Order[]

  @OneToMany(() => Conversation, (conversation) => conversation.client)
  conversations: Conversation[]

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date
}
