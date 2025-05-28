CREATE TABLE "car" (
	"car_id" serial PRIMARY KEY NOT NULL,
	"car_model" varchar(255),
	"manufacturer" varchar(255),
	"year" integer,
	"color" varchar(100),
	"rental_rate_per_day" numeric,
	"availability" boolean
);
--> statement-breakpoint
CREATE TABLE "customer" (
	"customer_id" serial PRIMARY KEY NOT NULL,
	"first_name" varchar(255),
	"last_name" varchar(255),
	"email" varchar(255),
	"phone_number" varchar(20),
	"address" varchar(500)
);
--> statement-breakpoint
CREATE TABLE "payment" (
	"payment_id" serial PRIMARY KEY NOT NULL,
	"rental_id" integer,
	"payment_date" date,
	"amount" numeric,
	"payment_method" varchar(50)
);
--> statement-breakpoint
CREATE TABLE "rental" (
	"rental_id" serial PRIMARY KEY NOT NULL,
	"car_id" integer,
	"customer_id" integer,
	"rental_start_date" date,
	"rental_end_date" date,
	"total_amount" numeric
);
--> statement-breakpoint
ALTER TABLE "payment" ADD CONSTRAINT "payment_rental_id_rental_rental_id_fk" FOREIGN KEY ("rental_id") REFERENCES "public"."rental"("rental_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rental" ADD CONSTRAINT "rental_car_id_car_car_id_fk" FOREIGN KEY ("car_id") REFERENCES "public"."car"("car_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rental" ADD CONSTRAINT "rental_customer_id_customer_customer_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."customer"("customer_id") ON DELETE cascade ON UPDATE no action;