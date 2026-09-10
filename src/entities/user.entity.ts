import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { UserRole } from './enums/user-role'
import { Person } from './person.entity'
import { IUser } from './models/user.interface'

@Entity({ name: 'user' })
export class User implements IUser {
    @PrimaryGeneratedColumn('increment', { name: 'id' })
    id?: number

    @Column({ name: 'username', type: 'varchar' })
    username: string

    @Column({ name: 'password', type: 'varchar' })
    password: string

    @Column({
        name: 'role',
        type: 'enum',
        enum: UserRole,
        default: UserRole.ALUNO,
    })
    role: UserRole

    @OneToOne(() => Person, (person) => person.user_id)
    person?: Person
}
