import { makeCreateAddressUseCase } from '@/use-cases/factory/make-create-address-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

const UFS_BRASILEIRAS = [
    'AC',
    'AL',
    'AP',
    'AM',
    'BA',
    'CE',
    'DF',
    'ES',
    'GO',
    'MA',
    'MT',
    'MS',
    'MG',
    'PA',
    'PB',
    'PR',
    'PE',
    'PI',
    'RJ',
    'RN',
    'RS',
    'RO',
    'RR',
    'SC',
    'SP',
    'SE',
    'TO',
] as const

export async function create(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        street: z.string().nonempty('Rua é obrigatória.').max(255, 'Rua deve ter no máximo 255 caracteres.'),
        city: z.string().nonempty('Cidade é obrigatória.').max(255, 'Cidade deve ter no máximo 255 caracteres.'),
        state: z
            .string()
            .nonempty('Estado (UF) é obrigatório.')
            .toUpperCase()
            .length(2, 'Estado deve conter exatamente 2 caracteres (ex: RJ, SP).')
            .refine((uf) => UFS_BRASILEIRAS.includes(uf as (typeof UFS_BRASILEIRAS)[number]), {
                message: 'Estado (UF) inválido. Exemplo válido: RJ, SP, MG.',
            }),
        zip_code: z
            .string()
            .nonempty('CEP é obrigatório.')
            .length(8, 'CEP deve conter exatamente 8 dígitos numéricos.'),
        person_id: z.coerce.number(),
    })

    const { street, city, state, zip_code, person_id } = registerBodySchema.parse(request.body)

    const createAddressUseCase = makeCreateAddressUseCase()

    const address = await createAddressUseCase.handler({ street, city, state, zip_code, person_id })

    reply.code(201).send(address)
}
