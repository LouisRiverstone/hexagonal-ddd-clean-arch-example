import { InvalidNameException } from "../exceptions/InvalidNameException";

export class Name {
    private readonly value: string;

    constructor(value: string) {
        if (!value || value.trim().length < 2) {
            throw new InvalidNameException(value);
        }
        this.value = value.trim();
    }

    public getValue(): string {
        return this.value;
    }
}
