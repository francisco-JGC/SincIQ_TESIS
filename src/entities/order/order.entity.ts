import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinColumn,
  CreateDateColumn
} from 'typeorm'
import { Client } from '../client/clients.entity'
import { Product } from '../products/products.entity'

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ default: 'pending' })
  status: string

  @ManyToOne(() => Client, (client) => client.orders)
  @JoinColumn() // <-- This is the column name in `order` table
  client: Client

  @ManyToMany(() => Product, (product) => product.orders)
  products: Product[]

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date
}
