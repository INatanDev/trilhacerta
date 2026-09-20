import { AddressRepository } from '@/repositories/typeorm/address.repository'
import { CreateAddressUseCase } from '../create-address'

export function makeCreateAddressUseCase() {
    const addressRepository = new AddressRepository()
    const addressUseCase = new CreateAddressUseCase(addressRepository)
    return addressUseCase
}
