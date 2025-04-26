import { Name } from "../value_objects/Name";
import { Address } from "../value_objects/Address";
import { CustomerStatus } from "../enums/CustomerStatus";
import { FutureBirthdayException } from "../exceptions/FutureBirthdayException";

export class Customer {
    private name: Name;
    private birthday: Date;
    private address: Address;
    private status: CustomerStatus;

    private constructor(name: Name, birthday: Date, address: Address, status: CustomerStatus) {
        this.name = name;
        this.birthday = birthday;
        this.address = address;
        this.status = status;
    }

    public static createNew(name: Name, birthday: Date, address: Address): Customer {
        if (birthday > new Date()) {
            throw new FutureBirthdayException(birthday);
        }
        return new Customer(name, birthday, address, CustomerStatus.DRAFT);
    }

    public static restore(name: Name, birthday: Date, address: Address, status: CustomerStatus): Customer {
        return new Customer(name, birthday, address, status);
    }

    public getStatus(): CustomerStatus {
        return this.status;
    }

    public getName(): Name {
        return this.name;
    }

    public getBirthday(): Date {
        return this.birthday;
    }

    public getAddress(): Address {
        return this.address;
    }

    public getZipCode(): string {
        return this.address.getZipCode();
    }

    public nextStatus(): void {
        switch (this.status) {
            case CustomerStatus.DRAFT:
                this.status = CustomerStatus.PENDING;
                break;
            case CustomerStatus.PENDING:
                this.status = CustomerStatus.FINISHED;
                break;
        }
    }

    public toPrimitives() {
        return {
            name: this.name.getValue(),
            birthday: this.birthday.toISOString(),
            status: this.status,
            address: {
                zipCode: this.address.getZipCode()
            }
        };
    }
}