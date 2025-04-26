import { GetCustomersService } from "@application/customer/use_cases/GetCustomerService";
import { CustomerRepositoryPort } from "@domain/customer/repositories/CustomerRepositoryPort";
import { Customer } from "@domain/customer/entities/Customer";
import { Name } from "@domain/customer/value_objects/Name";
import { Address } from "@domain/customer/value_objects/Address";
import { ZipCode } from "@domain/customer/value_objects/ZipCode";

// Repository mock for test isolation
class MockCustomerRepository implements CustomerRepositoryPort {
  public mockCustomers: Customer[] = [];
  public findAllMock = jest.fn();
  public saveMock = jest.fn();

  async findAll(): Promise<Customer[]> {
    this.findAllMock();
    return this.mockCustomers;
  }

  async save(customer: Customer): Promise<void> {
    this.saveMock(customer);
    this.mockCustomers.push(customer);
  }
}

describe('GetCustomersService', () => {
  let service: GetCustomersService;
  let repository: MockCustomerRepository;
  let customer1: Customer;
  let customer2: Customer;

  beforeEach(() => {
    repository = new MockCustomerRepository();
    service = new GetCustomersService(repository);

    // Create two customers for testing
    const name1 = new Name('John Doe');
    const birthday1 = new Date('1990-01-01');
    const address1 = new Address(new ZipCode('12345-678'));
    customer1 = Customer.createNew(name1, birthday1, address1);

    const name2 = new Name('Jane Doe');
    const birthday2 = new Date('1992-05-15');
    const address2 = new Address(new ZipCode('98765-432'));
    customer2 = Customer.createNew(name2, birthday2, address2);
  });

  it('should return empty array when no customers exist', async () => {
    // By default, the mock repository is empty
    const result = await service.execute();
    
    expect(repository.findAllMock).toHaveBeenCalledTimes(1);
    expect(result).toEqual([]);
  });

  it('should return all customers when they exist', async () => {
    // Add customers to the repository
    repository.mockCustomers.push(customer1);
    repository.mockCustomers.push(customer2);
    
    const result = await service.execute();
    
    expect(repository.findAllMock).toHaveBeenCalledTimes(1);
    expect(result).toHaveLength(2);
    expect(result).toContain(customer1);
    expect(result).toContain(customer2);
  });
}); 