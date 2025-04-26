export class InvalidZipCodeException extends Error {
    constructor(zip: string) {
        super(`Invalid zip code format: "${zip}". Expected format: 12345-678.`);
        this.name = "InvalidZipCodeException";
    }
}
