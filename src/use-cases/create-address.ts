import { IAddress } from '@/entities/models/address.interface'
import { IAddressRepository } from '@/repositories/address.repository.interface'
import { InvalidRelationError } from './errors/invalid-relation-error'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

const UFS_BRASILEIRAS = new Set([
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
])

export class CreateAddressUseCase {
    constructor(private addressRepository: IAddressRepository) {}

    async handler(addressData: Omit<IAddress, 'id'>): Promise<IAddress | undefined> {
        if (!addressData.person_id) throw new ResourceNotFoundError()

        // Normaliza UF para maiúsculas e remove espaços
        const state = (addressData.state ?? '').toString().trim().toUpperCase()
        const zipCode = (addressData.zip_code ?? '').toString().replace(/\D/g, '')
        const street = (addressData.street ?? '').trim()
        const city = (addressData.city ?? '').trim()

        // Validações de tamanho (alinhadas com o schema do banco)
        if (street.length === 0 || street.length > 255) {
            throw new InvalidRelationError()
        }
        if (city.length === 0 || city.length > 255) {
            throw new InvalidRelationError()
        }
        if (state.length !== 2 || !UFS_BRASILEIRAS.has(state)) {
            throw new InvalidRelationError()
        }
        if (zipCode.length !== 8) {
            throw new InvalidRelationError()
        }

        return this.addressRepository.create({
            ...addressData,
            street,
            city,
            state,
            zip_code: zipCode,
        })
    }
}
