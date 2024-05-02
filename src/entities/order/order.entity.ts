import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  OneToMany
} from 'typeorm'
import { Client } from '../client/clients.entity'
import { Product } from '../products/products.entity'

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Client, (client) => client.orders, { nullable: true })
  @JoinColumn()
  client?: Client

  @OneToMany(() => Product, (product) => product.orders)
  products: Product[]

  @Column()
  state: string // 'waiting' | 'cancelled' | 'completed'

  @Column()
  client_name: string

  @Column()
  phone_number: string

  @Column()
  total_price: number

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date
}
