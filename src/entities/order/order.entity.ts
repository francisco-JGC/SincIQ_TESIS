import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn
} from 'typeorm'
import { Client } from '../client/clients.entity'

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  product_name: string

  @Column()
  quantity: number

  @Column()
  price: number

  @Column({ default: 'pending' })
  status: string

  @ManyToOne(() => Client, (client) => client.orders)
  @JoinColumn() // <-- This is the column name in `order` table
  client: Client

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date
}
