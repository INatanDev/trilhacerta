import { create } from './create'
import { FastifyInstance } from 'fastify'

export async function topicoRoutes(app: FastifyInstance) {
    app.post('/topico', create)
}
