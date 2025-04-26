import { Customer } from "@domain/customer/entities/Customer";

export interface GetCustomersUseCase {
    execute(): Promise<Customer[]>;
}