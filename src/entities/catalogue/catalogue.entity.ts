import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Entity
} from 'typeorm'

@Entity()
export class Catalogue {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({ nullable: true })
  description?: string

  @Column({ nullable: true })
  banner?: string

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date
}
