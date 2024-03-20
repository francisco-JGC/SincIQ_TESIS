import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  CreateDateColumn
} from 'typeorm'
import { Order } from '../order/order.entity'

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  price: number

  @Column()
  description: string

  @Column({ nullable: true })
  category?: string

  @Column({ nullable: true })
  subcategory?: string

  @Column({ nullable: true, default: 0 })
  discount?: number

  @Column()
  quantity: number

  @Column({ default: 'active' })
  status: string

  @Column('text', { array: true, nullable: true, default: [] })
  images_url?: string[]

  @ManyToMany(() => Order, (order) => order.products)
  orders: Order[]

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date
}
