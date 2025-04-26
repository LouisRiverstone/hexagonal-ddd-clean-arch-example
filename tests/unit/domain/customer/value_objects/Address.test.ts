import { Address } from "@domain/customer/value_objects/Address";
import { ZipCode } from "@domain/customer/value_objects/ZipCode";

describe('Address Value Object', () => {
  it('should create a valid address with zip code', () => {
    const zipCode = new ZipCode('12345-678');
    const address = new Address(zipCode);
    
    expect(address.getZipCode()).toBe('12345-678');
  });
}); 