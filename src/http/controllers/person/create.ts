import { Cpf } from '@/entities/cpf'
import { makeCreatePersonUseCase } from '@/use-cases/factory/make-create-person-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const isValidCpf = (value: string): boolean => {
    try {
        // eslint-disable-next-line no-new
        new Cpf(value)
        return true
    } catch {
        return false
    }
}

export async function create(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        cpf: z.string().nonempty('CPF é obrigatório.').refine(isValidCpf, { message: 'CPF inválido.' }),
        name: z.string(),
        birth: z.coerce.date(),
        email: z.string().email(),
        user_id: z.coerce.number(),
    })

    const { cpf, name, birth, email, user_id } = registerBodySchema.parse(request.body)

    const createPersonUseCase = makeCreatePersonUseCase()

    const person = await createPersonUseCase.create({
        cpf,
        name,
        birth,
        email,
        user_id,
    })

    return reply.status(201).send(`Criado a pessoa: ${person?.name}`)
}
