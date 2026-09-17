import { UserRepository } from '@/repositories/typeorm/user.repository'
import { FindWithPersonUseCase } from '../find-with-person'

export function makeFindUserWithPersonUseCase() {
    const userRepository = new UserRepository()
    const findWithPersonUseCase = new FindWithPersonUseCase(userRepository)
    return findWithPersonUseCase
}
