import { ITopic } from '@/entities/models/topicos.interface'
import { ITopicRepository } from '../topico.repository.interface'
import { Topico } from '@/entities/topico.entity'
import { appDataSource } from '@/lib/typeorm/typeorm'
import { Repository } from 'typeorm'

export class TopicoRepository implements ITopicRepository {
    private repository: Repository<Topico>

    constructor() {
        this.repository = appDataSource.getRepository(Topico)
    }

    async create(topico: ITopic): Promise<ITopic | undefined> {
        return this.repository.save(topico)
    }

    async findAll(): Promise<ITopic[]> {
        return this.repository.find()
    }

    async findById(id: number): Promise<ITopic | undefined> {
        return (await this.repository.findOne({ where: { id } })) ?? (undefined as ITopic | undefined)
    }
}
