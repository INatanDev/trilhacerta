import { IPerson } from './person.interface'

export interface IAddress {
    id?: number
    street: string
    city: string
    state: string
    zip_code: string
    person_id?: IPerson | number
}
