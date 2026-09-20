import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Person } from './person.entity'
import { IAddress } from './models/address.interface'

@Entity({ name: 'address' })
export class Address implements IAddress {
    @PrimaryGeneratedColumn('increment', { name: 'id' })
    id?: number

    @Column({ name: 'street', type: 'varchar', length: 255 })
    street: string

    @Column({ name: 'city', type: 'varchar', length: 255 })
    city: string

    @Column({ name: 'state', type: 'varchar', length: 2 })
    state: string

    @Column({ name: 'zip_code', type: 'varchar', length: 10 })
    zip_code: string

    @Column({ name: 'person_id', type: 'int' })
    person_id?: number

    @ManyToOne(() => Person, (person) => person.address)
    @JoinColumn({ name: 'person_id' })
    person?: Person
}
