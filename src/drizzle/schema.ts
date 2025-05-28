import { pgTable, serial, varchar, integer, decimal, boolean, date } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const Car = pgTable("car", {
    carId: serial("car_id").primaryKey(),
    carModel: varchar("car_model", { length: 255 }),
    manufacturer: varchar("manufacturer", { length: 255 }),
    year: integer("year"),
    color: varchar("color", { length: 100 }),
    rentalRatePerDay: decimal("rental_rate_per_day"),
    availability: boolean("availability")
});

export const Customer = pgTable("customer", {
    customerId: serial("customer_id").primaryKey(),
    firstName: varchar("first_name", { length: 255 }),
    lastName: varchar("last_name", { length: 255 }),
    email: varchar("email", { length: 255 }),
    phoneNumber: varchar("phone_number", { length: 20 }),
    address: varchar("address", { length: 500 }),
});

export const Rental = pgTable("rental", {
    rentalId: serial("rental_id").primaryKey(),
    carId: integer("car_id").references(() => Car.carId,{onDelete:'cascade'}),
    customerId: integer("customer_id").references(() => Customer.customerId, {onDelete:'cascade'}),
    rentalStartDate: date("rental_start_date"),
    rentalEndDate: date("rental_end_date"),
    totalAmount: decimal("total_amount"),
});

export const Payment = pgTable("payment", {
    paymentId: serial("payment_id").primaryKey(),
    rentalId: integer("rental_id").references(() => Rental.rentalId,{onDelete:'cascade'}),
    paymentDate: date("payment_date"),
    amount: decimal("amount"),
    paymentMethod: varchar("payment_method", { length: 50 }),
});



// Car (one) → Rental (many)
export const carRentalRelation = relations(Car, ({ many }) => ({
  rentals: many(Rental),
}));

// Customer (one) → Rental (many)
export const customerRentalRelation = relations(Customer, ({ many }) => ({
  rentals: many(Rental),
}));

// Rental (many) → Car (one)
export const rentalCarRelation = relations(Rental, ({ one }) => ({
  car: one(Car, {
    fields: [Rental.carId],
    references: [Car.carId],
  }),
}));

// Rental (many) → Customer (one)
export const rentalCustomerRelation = relations(Rental, ({ one }) => ({
  customer: one(Customer, {
    fields: [Rental.customerId],
    references: [Customer.customerId],
  }),
}));

// Rental (one) → Payment (many)
export const rentalPaymentRelation = relations(Rental, ({ many }) => ({
  payments: many(Payment),
}));

// Payment (many) → Rental (one)
export const paymentRentalRelation = relations(Payment, ({ one }) => ({
  rental: one(Rental, {
    fields: [Payment.rentalId],
    references: [Rental.rentalId],
  }),
}));
