import { IAddressRepository } from '@/repositories/address.repository.interface'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { IAddress } from '@/entities/models/address.interface'
import { IPerson } from '@/entities/models/person.interface'

export class FindAddressByPersonUseCase {
    constructor(private addressRepository: IAddressRepository) {}

    async handler(person_id: number, page: number, limit: number): Promise<(IAddress & IPerson)[]> {
        const addresses = await this.addressRepository.findAddressByPersonId(person_id, page, limit)

        if (!addresses) throw new ResourceNotFoundError()

        return addresses
    }
}
