import { container } from "@config/DependencyInjection";
import { CreateCustomerService } from "@application/customer/use_cases/CreateCustomerService";
import { GetCustomersService } from "@application/customer/use_cases/GetCustomerService";

describe('DependencyInjection', () => {
  it('should have all required services properly configured', () => {
    // Verifica se o container exporta os serviços necessários
    expect(container).toHaveProperty('createCustomerService');
    expect(container).toHaveProperty('getCustomersService');
    
    // Verifica se os serviços são das classes corretas
    expect(container.createCustomerService).toBeInstanceOf(CreateCustomerService);
    expect(container.getCustomersService).toBeInstanceOf(GetCustomersService);
  });
}); 