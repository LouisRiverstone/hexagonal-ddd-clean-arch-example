import { CustomerRepositoryMemory } from "@infrastructure/persistence/memory/CustomerRepositoryMemory";
import { CreateCustomerService } from "@application/customer/use_cases/CreateCustomerService";
import { GetCustomersService } from "@application/customer/use_cases/GetCustomerService";
import { CustomerStatus } from "@domain/customer/enums/CustomerStatus";

describe('Customer Management Integration', () => {
  let customerRepository: CustomerRepositoryMemory;
  let createCustomerService: CreateCustomerService;
  let getCustomersService: GetCustomersService;

  beforeEach(() => {
    // Initialize repository and services similar to DependencyInjection.ts
    customerRepository = new CustomerRepositoryMemory();
    createCustomerService = new CreateCustomerService(customerRepository);
    getCustomersService = new GetCustomersService(customerRepository);
  });

  it('should create and retrieve customers', async () => {
    // Initially there should be no customers
    const initialCustomers = await getCustomersService.execute();
    expect(initialCustomers).toHaveLength(0);

    // Create two customers
    await createCustomerService.execute('Mario', new Date('1970-12-18T00:00:00.000Z'), '99990-000');
    await createCustomerService.execute('Luigi', new Date('1985-05-15T00:00:00.000Z'), '88880-111');

    // Verify both were created correctly
    const customers = await getCustomersService.execute();
    expect(customers).toHaveLength(2);

    // Verify first customer data
    expect(customers[0].getName().getValue()).toBe('Mario');
    expect(customers[0].getBirthday().toISOString()).toBe('1970-12-18T00:00:00.000Z');
    expect(customers[0].getZipCode()).toBe('99990-000');
    expect(customers[0].getStatus()).toBe(CustomerStatus.DRAFT);

    // Verify second customer data
    expect(customers[1].getName().getValue()).toBe('Luigi');
    expect(customers[1].getBirthday().toISOString()).toBe('1985-05-15T00:00:00.000Z');
    expect(customers[1].getZipCode()).toBe('88880-111');
    expect(customers[1].getStatus()).toBe(CustomerStatus.DRAFT);
  });

  it('should change customer status', async () => {
    // Create a customer
    await createCustomerService.execute('Mario', new Date('1970-12-18T00:00:00.000Z'), '99990-000');
    
    // Get the customer
    const customers = await getCustomersService.execute();
    const customer = customers[0];
    
    // Verify initial status
    expect(customer.getStatus()).toBe(CustomerStatus.DRAFT);
    
    // Advance status
    customer.nextStatus();
    expect(customer.getStatus()).toBe(CustomerStatus.PENDING);
    
    // Advance again
    customer.nextStatus();
    expect(customer.getStatus()).toBe(CustomerStatus.FINISHED);
    
    // Advance one more time (should not change)
    customer.nextStatus();
    expect(customer.getStatus()).toBe(CustomerStatus.FINISHED);
    
    // Confirm data is still correct
    expect(customer.getName().getValue()).toBe('Mario');
    expect(customer.getZipCode()).toBe('99990-000');
  });

  it('should handle the sequence shown in main.ts', async () => {
    // 1. Initially there should be no customers
    const initialCustomers = await getCustomersService.execute();
    expect(initialCustomers).toHaveLength(0);

    // 2. Create Mario customer
    await createCustomerService.execute('Mario', new Date('1970-12-18T00:00:00.000Z'), '99990-000');

    // 3. Create Luigi customer
    await createCustomerService.execute('Luigi', new Date('1985-05-15T00:00:00.000Z'), '88880-111');

    // 4. Get all customers
    const customers = await getCustomersService.execute();
    expect(customers).toHaveLength(2);
    
    // Verify primitives (as in main.ts)
    expect(customers[0].toPrimitives()).toEqual({
      name: 'Mario',
      birthday: '1970-12-18T00:00:00.000Z',
      status: CustomerStatus.DRAFT,
      address: {
        zipCode: '99990-000'
      }
    });
    
    expect(customers[1].toPrimitives()).toEqual({
      name: 'Luigi',
      birthday: '1985-05-15T00:00:00.000Z',
      status: CustomerStatus.DRAFT,
      address: {
        zipCode: '88880-111'
      }
    });

    // 5. Advance the first customer's status
    customers[0].nextStatus();
    expect(customers[0].getStatus()).toBe(CustomerStatus.PENDING);
    
    // 6. Verify changes persist
    const finalCustomers = await getCustomersService.execute();
    expect(finalCustomers).toHaveLength(2);
    expect(finalCustomers[0].getStatus()).toBe(CustomerStatus.PENDING);
    expect(finalCustomers[1].getStatus()).toBe(CustomerStatus.DRAFT);
  });
}); 