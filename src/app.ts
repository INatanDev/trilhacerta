import fastify from 'fastify'
import { personRoutes } from '@/http/controllers/person/routes'
import { userRoutes } from './http/controllers/users/routes'
import { globalErrorHandler } from './util/global-error-handler'

export const app = fastify()

app.register(personRoutes)
app.register(userRoutes)

app.setErrorHandler(globalErrorHandler)
