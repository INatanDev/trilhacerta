import { makeCreateUserUseCase } from '@/use-cases/factory/make-create-user-use-case'
import { UserRole } from '@/entities/enums/user-role'
import { FastifyRequest, FastifyReply } from 'fastify'
import z from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        username: z.string(),
        password: z.string(),
        role: z
            .enum([UserRole.ALUNO, UserRole.PROFESSOR, UserRole.ADMIN, 'aluno', 'professor', 'admin'])
            .default(UserRole.ALUNO)
            .transform((role) => role.toUpperCase()),
    })

    const { username, password, role } = registerBodySchema.parse(request.body)

    const createUserUseCase = makeCreateUserUseCase()

    const user = await createUserUseCase.handle({ username, password, role: role as UserRole })

    return reply.status(201).send({ id: user?.id, username })
}
