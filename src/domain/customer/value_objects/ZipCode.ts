import { InvalidZipCodeException } from "../exceptions/InvalidZipCodeException";

export class ZipCode {
    private readonly value: string;

    constructor(value: string) {
        if (!/^\d{5}-\d{3}$/.test(value)) {
            throw new InvalidZipCodeException(value);
        }
        this.value = value;
    }

    public getValue(): string {
        return this.value;
    }
}
