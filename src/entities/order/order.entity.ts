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

  @ManyToOne(() => Client, (client) => client.orders)
  @JoinColumn()
  client?: Client

  @ManyToMany(() => Product, (product) => product.orders)
  products: Product[]

  @Column()
  state: string // 'waiting' | 'cancelled' | 'completed

  @Column()
  quantity: number

  @Column()
  client_name: string

  @Column()
  total_price: number

  @Column({ nullable: true })
  discount?: number

  @Column({ nullable: true })
  unit_price?: number

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date
}
