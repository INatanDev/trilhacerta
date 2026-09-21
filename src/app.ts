import 'reflect-metadata'
import fastify from 'fastify'
import { personRoutes } from '@/http/controllers/person/routes'
import { userRoutes } from './http/controllers/users/routes'
import { globalErrorHandler } from './util/global-error-handler'
import { addressRoutes } from './http/controllers/address/routes'
import { topicoRoutes } from './http/controllers/topicos/routes'

export const app = fastify()

app.register(personRoutes)
app.register(userRoutes)
app.register(addressRoutes)
app.register(topicoRoutes)

app.setErrorHandler(globalErrorHandler)
