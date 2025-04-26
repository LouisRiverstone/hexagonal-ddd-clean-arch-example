import { Customer } from "../entities/Customer";

export interface CustomerRepositoryPort {
    save(customer: Customer): Promise<void>;
    findAll(): Promise<Customer[]>;
}