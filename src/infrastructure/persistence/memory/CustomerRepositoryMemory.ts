import { CustomerRepositoryPort } from "@domain/customer/repositories/CustomerRepositoryPort";
import { Customer } from "@domain/customer/entities/Customer";

export class CustomerRepositoryMemory implements CustomerRepositoryPort {
    private customers: Customer[] = [];

    async save(customer: Customer): Promise<void> {
        this.customers.push(customer);
    }

    async findAll(): Promise<Customer[]> {
        return this.customers;
    }
}