import { Name } from "@domain/customer/value_objects/Name";
import { InvalidNameException } from "@domain/customer/exceptions/InvalidNameException";

describe('Name Value Object', () => {
  it('should create a valid name', () => {
    const name = new Name('John Doe');
    expect(name.getValue()).toBe('John Doe');
  });

  it('should throw InvalidNameException when name is empty', () => {
    expect(() => new Name('')).toThrow(InvalidNameException);
  });

  it('should throw InvalidNameException when name is too short', () => {
    expect(() => new Name('A')).toThrow(InvalidNameException);
  });

  it('should trim whitespace from name', () => {
    const name = new Name('  John Doe  ');
    expect(name.getValue()).toBe('John Doe');
  });
}); 