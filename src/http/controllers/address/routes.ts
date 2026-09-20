import { app } from '@/app'
import { findAddress } from './find-address'
import { create } from './create'

export async function addressRoutes() {
    app.post('/address', create)
    app.get('/address/person/:personId', findAddress)
}
