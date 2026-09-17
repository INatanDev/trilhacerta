export class Cpf {
    private readonly value: string

    constructor(value: string) {
        const cleaned = value.replace(/\D/g, '')
        if (!this.isValid(cleaned)) {
            throw new Error('CPF inválido.')
        }
        this.value = cleaned
    }

    public getValue(): string {
        return this.value
    }

    private isValid(cpf: string): boolean {
        if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false
        let sum = 0
        let rest = 0

        for (let i = 1; i <= 9; i++) sum += parseInt(cpf[i - 1]) * (11 - i)
        rest = (sum * 10) % 11
        if (rest === 10 || rest === 11) rest = 0
        if (rest !== parseInt(cpf[9])) return false

        sum = 0
        for (let i = 1; i <= 10; i++) sum += parseInt(cpf[i - 1]) * (12 - i)
        rest = (sum * 10) % 11
        if (rest === 10 || rest === 11) rest = 0
        return rest === parseInt(cpf[10])
    }
}
