import { Field, ObjectType } from "@nestjs/graphql"
import { User } from "src/auth/entities/user.entity"
import { Column, CreateDateColumn, Entity, Generated, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity({ name: 'tickets' })
@ObjectType()
export class Ticket {

    @PrimaryColumn('uuid')
    @Field()
    id: string

    @Generated('increment')
    @Column({ unique: true })
    @Field()
    ticketNumber: number

    @Column()
    @Field()
    title: string

    @Column()
    @Field()
    issue: string

    @Column()
    @Field()
    category: string

    @Column()
    @Field()
    orderDetail: string

    @Column({ type: Boolean, default: false })
    @Field()
    isClosed: boolean

    @CreateDateColumn()
    @Field()
    createdAt: Date

    @UpdateDateColumn()
    @Field()
    modifiedAt: Date

    @Column({ type: Boolean, default: false })
    isDeleted: Boolean

    @Column({ nullable: true })
    @Field()
    imageProductUrl: string

    @ManyToOne(
        () => User,
        (user) => user.ticket,
        { eager: true }
    )
    user: User
}
