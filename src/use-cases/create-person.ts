import { Cpf } from '@/entities/cpf'
import { IPerson } from '@/entities/models/person.interface'
import { IPersonRepository } from '@/repositories/person.repository.interface'
import { CpfValidationError } from './errors/cpf-validation-error'
import { DuplicateResourceError } from './errors/duplicate-resource-error'

export class CreatePersonUseCase {
    constructor(private personRepository: IPersonRepository) {}

    async create(personData: Omit<IPerson, 'id'>): Promise<IPerson | undefined> {
        let validCpf: Cpf

        try {
            validCpf = new Cpf(personData.cpf)
        } catch {
            throw new CpfValidationError()
        }

        const cpfAlreadyRegistered = await this.personRepository.findByCpf(validCpf.getValue())
        if (cpfAlreadyRegistered) {
            throw new DuplicateResourceError()
        }

        const person: Omit<IPerson, 'id'> = {
            ...personData,
            cpf: validCpf.getValue(),
        }

        return this.personRepository.create(person)
    }
}
