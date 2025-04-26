import { CustomerRepositoryMemory } from "@infrastructure/persistence/memory/CustomerRepositoryMemory";
import { Customer } from "@domain/customer/entities/Customer";
import { Name } from "@domain/customer/value_objects/Name";
import { Address } from "@domain/customer/value_objects/Address";
import { ZipCode } from "@domain/customer/value_objects/ZipCode";

describe('CustomerRepositoryMemory', () => {
  let repository: CustomerRepositoryMemory;
  let customer: Customer;

  beforeEach(() => {
    repository = new CustomerRepositoryMemory();
    const name = new Name('John Doe');
    const birthday = new Date('1990-01-01');
    const address = new Address(new ZipCode('12345-678'));
    customer = Customer.createNew(name, birthday, address);
  });

  it('should save a customer', async () => {
    await repository.save(customer);
    const customers = await repository.findAll();
    
    expect(customers).toHaveLength(1);
    expect(customers[0]).toBe(customer);
  });

  it('should find all customers', async () => {
    // Repository should be empty initially
    expect(await repository.findAll()).toHaveLength(0);
    
    // Save two customers
    await repository.save(customer);
    
    const anotherName = new Name('Jane Doe');
    const anotherBirthday = new Date('1992-05-15');
    const anotherAddress = new Address(new ZipCode('98765-432'));
    const anotherCustomer = Customer.createNew(anotherName, anotherBirthday, anotherAddress);
    await repository.save(anotherCustomer);
    
    // Check both are returned
    const customers = await repository.findAll();
    expect(customers).toHaveLength(2);
    expect(customers[0]).toBe(customer);
    expect(customers[1]).toBe(anotherCustomer);
  });
}); 