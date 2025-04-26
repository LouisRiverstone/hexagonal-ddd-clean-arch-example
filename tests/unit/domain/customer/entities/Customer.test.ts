import { Customer } from "@domain/customer/entities/Customer";
import { Name } from "@domain/customer/value_objects/Name";
import { Address } from "@domain/customer/value_objects/Address";
import { ZipCode } from "@domain/customer/value_objects/ZipCode";
import { CustomerStatus } from "@domain/customer/enums/CustomerStatus";
import { FutureBirthdayException } from "@domain/customer/exceptions/FutureBirthdayException";

describe('Customer Entity', () => {
  const validName = new Name('John Doe');
  const validBirthday = new Date('1990-01-01');
  const validAddress = new Address(new ZipCode('12345-678'));

  describe('createNew', () => {
    it('should create a new customer with DRAFT status', () => {
      const customer = Customer.createNew(validName, validBirthday, validAddress);
      
      expect(customer.getName()).toBe(validName);
      expect(customer.getBirthday()).toBe(validBirthday);
      expect(customer.getAddress()).toBe(validAddress);
      expect(customer.getStatus()).toBe(CustomerStatus.DRAFT);
    });

    it('should throw FutureBirthdayException when birthday is in the future', () => {
      const futureBirthday = new Date();
      futureBirthday.setFullYear(futureBirthday.getFullYear() + 1);
      
      expect(() => Customer.createNew(validName, futureBirthday, validAddress))
        .toThrow(FutureBirthdayException);
    });
  });

  describe('restore', () => {
    it('should restore a customer with given status', () => {
      const customer = Customer.restore(validName, validBirthday, validAddress, CustomerStatus.PENDING);
      
      expect(customer.getName()).toBe(validName);
      expect(customer.getBirthday()).toBe(validBirthday);
      expect(customer.getAddress()).toBe(validAddress);
      expect(customer.getStatus()).toBe(CustomerStatus.PENDING);
    });
  });

  describe('nextStatus', () => {
    it('should change status from DRAFT to PENDING', () => {
      const customer = Customer.createNew(validName, validBirthday, validAddress);
      expect(customer.getStatus()).toBe(CustomerStatus.DRAFT);
      
      customer.nextStatus();
      expect(customer.getStatus()).toBe(CustomerStatus.PENDING);
    });

    it('should change status from PENDING to FINISHED', () => {
      const customer = Customer.restore(validName, validBirthday, validAddress, CustomerStatus.PENDING);
      expect(customer.getStatus()).toBe(CustomerStatus.PENDING);
      
      customer.nextStatus();
      expect(customer.getStatus()).toBe(CustomerStatus.FINISHED);
    });

    it('should not change status when already FINISHED', () => {
      const customer = Customer.restore(validName, validBirthday, validAddress, CustomerStatus.FINISHED);
      expect(customer.getStatus()).toBe(CustomerStatus.FINISHED);
      
      customer.nextStatus();
      expect(customer.getStatus()).toBe(CustomerStatus.FINISHED);
    });
  });

  describe('toPrimitives', () => {
    it('should return primitives representation', () => {
      const customer = Customer.createNew(validName, validBirthday, validAddress);
      const primitives = customer.toPrimitives();
      
      expect(primitives).toEqual({
        name: validName.getValue(),
        birthday: validBirthday.toISOString(),
        status: CustomerStatus.DRAFT,
        address: {
          zipCode: validAddress.getZipCode()
        }
      });
    });
  });
}); 