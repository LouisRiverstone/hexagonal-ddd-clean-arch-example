import { CustomerRepositoryMemory } from "@infrastructure/persistence/memory/CustomerRepositoryMemory";
import { CreateCustomerService } from "@application/customer/use_cases/CreateCustomerService";
import { GetCustomersService } from "@application/customer/use_cases/GetCustomerService";

const customerRepository = new CustomerRepositoryMemory();
const createCustomerService = new CreateCustomerService(customerRepository);
const getCustomersService = new GetCustomersService(customerRepository);

export const container = {
    createCustomerService,
    getCustomersService
};