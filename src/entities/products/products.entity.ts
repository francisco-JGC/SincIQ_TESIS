import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  CreateDateColumn,
  ManyToOne
} from 'typeorm'
import { Order } from '../order/order.entity'
import { Category } from '../categories/category.entity'

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  price: number

  @Column({ type: 'enum', enum: ['Masculino', 'Femenino', 'Unisex'] })
  gender: 'Masculino' | 'Femenino' | 'Unisex'

  @Column({ nullable: true })
  description?: string

  @ManyToOne(() => Category, (category) => category.products)
  category: Category

  @Column({ nullable: true, default: 0 })
  discount?: number

  @Column()
  quantity: number

  @Column()
  state: string

  @Column({ type: 'boolean' })
  visibility: boolean

  @Column('text', { array: true, nullable: true, default: [] })
  images_url?: string[]

  @ManyToMany(() => Order, (order) => order.products, { nullable: true })
  orders?: Order[]

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date
}
