import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { Conversation } from '../conversation/conversation.entity'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  username: string

  @Column({ unique: true })
  email: string

  @Column({ nullable: true })
  password: string

  @Column({ default: false })
  provider: 'local' | 'facebook'

  @Column({ nullable: true })
  provider_id: string

  @Column({ nullable: true })
  image_url: string

  @OneToMany(() => Conversation, (conversation) => conversation.user)
  conversations: Conversation[]
}
