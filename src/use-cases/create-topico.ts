import { Topico } from '@/entities/topico.entity'
import { ITopicRepository } from '@/repositories/topico.repository.interface'

export class CreateTopicoUseCase {
    constructor(private topicoRepository: ITopicRepository) {}

    async handle(topico: Topico): Promise<Topico | undefined> {
        return this.topicoRepository.create(topico)
    }
}
