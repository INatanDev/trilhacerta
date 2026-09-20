export class CpfValidationError extends Error {
    constructor() {
        super('CPF inválido.')
    }
}
