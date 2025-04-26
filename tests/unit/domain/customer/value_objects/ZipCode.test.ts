import { ZipCode } from "@domain/customer/value_objects/ZipCode";
import { InvalidZipCodeException } from "@domain/customer/exceptions/InvalidZipCodeException";

describe('ZipCode Value Object', () => {
  it('should create a valid zip code', () => {
    const zipCode = new ZipCode('12345-678');
    expect(zipCode.getValue()).toBe('12345-678');
  });

  it('should throw InvalidZipCodeException when format is invalid', () => {
    expect(() => new ZipCode('123-456')).toThrow(InvalidZipCodeException);
    expect(() => new ZipCode('123456789')).toThrow(InvalidZipCodeException);
    expect(() => new ZipCode('abcde-xyz')).toThrow(InvalidZipCodeException);
    expect(() => new ZipCode('12345-12')).toThrow(InvalidZipCodeException);
    expect(() => new ZipCode('1234-1234')).toThrow(InvalidZipCodeException);
  });
}); 