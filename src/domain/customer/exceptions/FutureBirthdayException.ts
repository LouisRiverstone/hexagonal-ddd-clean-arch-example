export class FutureBirthdayException extends Error {
    constructor(birthday: Date) {
        super(`Birthday "${birthday.toISOString()}" cannot be in the future.`);
        this.name = "FutureBirthdayException";
    }
}
