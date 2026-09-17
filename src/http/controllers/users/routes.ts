import { create } from './create'
import { FastifyInstance } from 'fastify'
import { findUser } from './find-user'

export async function userRoutes(app: FastifyInstance) {
    app.post('/user', create)
    app.get('/user/:id', findUser)
}
