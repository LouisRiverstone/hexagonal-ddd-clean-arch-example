import { ZipCode } from "./ZipCode";

export class Address {
    private readonly zipCode: ZipCode;

    constructor(zipCode: ZipCode) {
        this.zipCode = zipCode;
    }

    public getZipCode(): string {
        return this.zipCode.getValue();
    }
}
