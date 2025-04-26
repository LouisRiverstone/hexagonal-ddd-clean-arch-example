export interface CreateCustomerUseCase {
    execute(name: string, birthday: Date, zipCode: string): Promise<void>;
}