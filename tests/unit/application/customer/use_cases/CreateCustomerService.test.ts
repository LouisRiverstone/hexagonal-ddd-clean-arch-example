import { CreateCustomerService } from "@application/customer/use_cases/CreateCustomerService";
import { CustomerRepositoryPort } from "@domain/customer/repositories/CustomerRepositoryPort";
import { Customer } from "@domain/customer/entities/Customer";
import { Name } from "@domain/customer/value_objects/Name";
import { Address } from "@domain/customer/value_objects/Address";
import { ZipCode } from "@domain/customer/value_objects/ZipCode";

// Repository mock for test isolation
class MockCustomerRepository implements CustomerRepositoryPort {
  private customers: Customer[] = [];
  public saveMock = jest.fn();
  public findAllMock = jest.fn();

  async save(customer: Customer): Promise<void> {
    this.saveMock(customer);
    this.customers.push(customer);
  }

  async findAll(): Promise<Customer[]> {
    this.findAllMock();
    return this.customers;
  }
}

describe('CreateCustomerService', () => {
  let service: CreateCustomerService;
  let repository: MockCustomerRepository;

  beforeEach(() => {
    repository = new MockCustomerRepository();
    service = new CreateCustomerService(repository);
  });

  it('should create a new customer with valid data', async () => {
    const name = 'John Doe';
    const birthday = new Date('1990-01-01');
    const zipCode = '12345-678';

    await service.execute(name, birthday, zipCode);

    // Verify that save method was called
    expect(repository.saveMock).toHaveBeenCalledTimes(1);
    
    // Verify that a Customer was saved
    const savedCustomer = repository.saveMock.mock.calls[0][0];
    expect(savedCustomer).toBeInstanceOf(Customer);
    expect(savedCustomer.getName().getValue()).toBe(name);
    expect(savedCustomer.getBirthday()).toEqual(birthday);
    expect(savedCustomer.getZipCode()).toBe(zipCode);
  });

  it('should throw error when name is invalid', async () => {
    const name = '';  // Invalid name (empty)
    const birthday = new Date('1990-01-01');
    const zipCode = '12345-678';

    await expect(service.execute(name, birthday, zipCode)).rejects.toThrow();
    expect(repository.saveMock).not.toHaveBeenCalled();
  });

  it('should throw error when zipCode is invalid', async () => {
    const name = 'John Doe';
    const birthday = new Date('1990-01-01');
    const zipCode = 'invalid';  // Invalid format

    await expect(service.execute(name, birthday, zipCode)).rejects.toThrow();
    expect(repository.saveMock).not.toHaveBeenCalled();
  });

  it('should throw error when birthday is in the future', async () => {
    const name = 'John Doe';
    const birthday = new Date();
    birthday.setFullYear(birthday.getFullYear() + 1);  // Future date
    const zipCode = '12345-678';

    await expect(service.execute(name, birthday, zipCode)).rejects.toThrow();
    expect(repository.saveMock).not.toHaveBeenCalled();
  });
}); 