import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { ITopic } from './models/topicos.interface'

@Entity({ name: 'topicos' })
export class Topico implements ITopic {
    @PrimaryGeneratedColumn('increment', { name: 'id' })
    id?: number

    @Column({ name: 'nome', type: 'varchar' })
    nome: string

    @Column({ name: 'descricao', type: 'varchar' })
    descricao: string
}
