import { container } from "@config/DependencyInjection";
import { Customer } from "@domain/customer/entities/Customer";

async function run() {
    console.log("=== Customer Console Application ===");

    const { createCustomerService, getCustomersService } = container;

    // 1. List customers (should be empty initially)
    console.log("\n[1] Customers initially:");
    console.log(await getCustomersService.execute());

    // 2. Create new customer
    console.log("\n[2] Creating customer Mario...");
    await createCustomerService.execute("Mario", new Date("1970-12-18T00:00:00.000Z"), "99990-000");

    // 3. Create new customer Luigi
    console.log("\n[3] Creating customer Luigi...");
    await createCustomerService.execute("Luigi", new Date("1985-05-15T00:00:00.000Z"), "88880-111");

    // 4. List customers again
    console.log("\n[4] Customers after creation:");
    const customers = await getCustomersService.execute();
    customers.forEach((c: Customer, idx: number) => {
        console.log(`Customer #${idx + 1}:`, c.toPrimitives());
    });

    // 5. Advance status of a customer
    console.log("\n[5] Advancing first customer's status...");
    customers[0].nextStatus();
    console.log(`New Status: ${customers[0].getStatus()}`);

    console.log("\n[6] Final list:");
    customers.forEach((c: Customer, idx: number) => {
        console.log(`Customer #${idx + 1}:`, c.toPrimitives());
    });

    console.log("\n=== Finished ===");
}

run();