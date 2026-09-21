import { TopicoRepository } from '@/repositories/typeorm/topico.repository'
import { CreateTopicoUseCase } from '../create-topico'

export function makeCreateTopicoUseCase() {
    const topicoRepository = new TopicoRepository()
    const createTopicoUseCase = new CreateTopicoUseCase(topicoRepository)
    return createTopicoUseCase
}
