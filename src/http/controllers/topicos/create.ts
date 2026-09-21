import { makeCreateTopicoUseCase } from '@/use-cases/factory/make-create-topico-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import z from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
    const createBodySchema = z.object({
        nome: z.string(),
        descricao: z.string(),
    })

    const { nome, descricao } = createBodySchema.parse(request.body)

    const createTopicoUseCase = makeCreateTopicoUseCase()

    const topico = await createTopicoUseCase.handle({ nome, descricao })

    return reply.status(201).send(topico)
}
