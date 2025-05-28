import db from "./db";
import { Car, Customer, Rental, Payment } from "./schema";

async function seed() {
    // Insert cars
    const [civic] = await db.insert(Car).values({
        carModel: "Civic",
        manufacturer: "Honda",
        year: 2022,
        color: "Red",
        rentalRatePerDay: "55.00",
        availability: true,
    }).returning();

    const [corolla] = await db.insert(Car).values({
        carModel: "Corolla",
        manufacturer: "Toyota",
        year: 2021,
        color: "Blue",
        rentalRatePerDay: "50.00",
        availability: true,
    }).returning();

    const [mustang] = await db.insert(Car).values({
        carModel: "Mustang",
        manufacturer: "Ford",
        year: 2023,
        color: "Black",
        rentalRatePerDay: "120.00",
        availability: true,
    }).returning();

    const [model3] = await db.insert(Car).values({
        carModel: "Model 3",
        manufacturer: "Tesla",
        year: 2024,
        color: "White",
        rentalRatePerDay: "130.00",
        availability: true,
    }).returning();

    // Insert customers
    const [alice] = await db.insert(Customer).values({
        firstName: "Alice",
        lastName: "Smith",
        email: "alice@example.com",
        phoneNumber: "1234567890",
        address: "123 Main St",
    }).returning();

    const [bob] = await db.insert(Customer).values({
        firstName: "Bob",
        lastName: "Jones",
        email: "bob@example.com",
        phoneNumber: "0987654321",
        address: "456 Elm St",
    }).returning();

    const [carol] = await db.insert(Customer).values({
        firstName: "Carol",
        lastName: "Taylor",
        email: "carol@example.com",
        phoneNumber: "1122334455",
        address: "789 Oak St",
    }).returning();

    const [dave] = await db.insert(Customer).values({
        firstName: "Dave",
        lastName: "Wilson",
        email: "dave@example.com",
        phoneNumber: "6677889900",
        address: "321 Pine St",
    }).returning();

    // Insert rentals
    const [aliceRental] = await db.insert(Rental).values({
        carId: civic.carId,
        customerId: alice.customerId,
        rentalStartDate: "2025-05-01",
        rentalEndDate: "2025-05-03",
        totalAmount: "165.00",
    }).returning();

    const [bobRental] = await db.insert(Rental).values({
        carId: corolla.carId,
        customerId: bob.customerId,
        rentalStartDate: "2025-05-10",
        rentalEndDate: "2025-05-13",
        totalAmount: "150.00",
    }).returning();

    const [carolRental] = await db.insert(Rental).values({
        carId: mustang.carId,
        customerId: carol.customerId,
        rentalStartDate: "2025-06-01",
        rentalEndDate: "2025-06-05",
        totalAmount: "480.00",
    }).returning();

    const [daveRental] = await db.insert(Rental).values({
        carId: model3.carId,
        customerId: dave.customerId,
        rentalStartDate: "2025-06-10",
        rentalEndDate: "2025-06-12",
        totalAmount: "260.00",
    }).returning();

    // Insert payments
    await db.insert(Payment).values({
        rentalId: aliceRental.rentalId,
        paymentDate: "2025-05-03",
        amount: "165.00",
        paymentMethod: "Credit Card",
    });

    await db.insert(Payment).values({
        rentalId: bobRental.rentalId,
        paymentDate: "2025-05-13",
        amount: "150.00",
        paymentMethod: "Cash",
    });

    await db.insert(Payment).values({
        rentalId: carolRental.rentalId,
        paymentDate: "2025-06-05",
        amount: "480.00",
        paymentMethod: "Debit Card",
    });

    await db.insert(Payment).values({
        rentalId: daveRental.rentalId,
        paymentDate: "2025-06-12",
        amount: "260.00",
        paymentMethod: "PayPal",
    });

    console.log("✅ Car rental seeding complete!");
    process.exit(0);
}

seed().catch((e) => {
  console.error("❌ Car rental seeding failed:", e);
  process.exit(1);
});
