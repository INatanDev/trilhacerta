import { ITopic } from '@/entities/models/topicos.interface'

export interface ITopicRepository {
    create(topico: ITopic): Promise<ITopic | undefined>
    findAll(): Promise<ITopic[]>
    findById(id: number): Promise<ITopic | undefined>
}
