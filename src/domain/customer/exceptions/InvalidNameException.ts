export class InvalidNameException extends Error {
    constructor(name: string) {
        super(`Invalid name: "${name}". Name must have at least 2 characters.`);
        this.name = "InvalidNameException";
    }
}