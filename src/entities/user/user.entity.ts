import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { Conversation } from '../conversation/conversation.entity'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  username: string

  @Column()
  password: string

  @OneToMany(() => Conversation, (conversation) => conversation.user)
  conversations: Conversation[]
}
