import { GetCustomersUseCase } from "../ports/in/GetCustomerUseCase";
import { CustomerRepositoryPort } from "@domain/customer/repositories/CustomerRepositoryPort";

export class GetCustomersService implements GetCustomersUseCase {
    constructor(private readonly customerRepository: CustomerRepositoryPort) {}

    async execute() {
        return await this.customerRepository.findAll();
    }
}