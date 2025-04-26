import { CreateCustomerUseCase } from "../ports/in/CreateCustomerUseCase";
import { CustomerRepositoryPort } from "@domain/customer/repositories/CustomerRepositoryPort";
import { Name } from "@domain/customer/value_objects/Name";
import { Customer } from "@domain/customer/entities/Customer";
import { ZipCode } from "@domain/customer/value_objects/ZipCode";
import { Address } from "@domain/customer/value_objects/Address";

export class CreateCustomerService implements CreateCustomerUseCase {
    constructor(private readonly customerRepository: CustomerRepositoryPort) {}

    async execute(name: string, birthday: Date, zipCode: string): Promise<void> {
        const customer = Customer.createNew(
            new Name(name),
            birthday,
            new Address(new ZipCode(zipCode))
        );
        await this.customerRepository.save(customer);
    }
}