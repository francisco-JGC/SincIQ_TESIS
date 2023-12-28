import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  Unique
} from 'typeorm'
import { Order } from '../order/order.entity'

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

  @OneToMany(() => Order, (order) => order.client)
  orders?: Order[]

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date
}
