import db from "./drizzle/db";

// Get Rentals with Car and Customer info
const getRentalsWithDetails = async () => {
  return await db.query.Rental.findMany({
    with: {
      car: {
        columns: {
          carModel: true,
          manufacturer: true,
          year: true,
          color: true,
          rentalRatePerDay: true,
        },
      },
      customer: {
        columns: {
          firstName: true,
          lastName: true,
          email: true,
          phoneNumber: true,
          address: true,
        },
      },
    },
  });
};

const getPaymentsWithDetails = async () => {
  return await db.query.Payment.findMany({
    with: {
      rental: {
        columns: {
          rentalStartDate: true,
          rentalEndDate: true,
          totalAmount: true,
        },
        with: {
          customer: {
            columns: {
              firstName: true,
              lastName: true,
              email: true,
            },
          },
          car: {
            columns: {
              carModel: true,
              manufacturer: true
            },
          },
        },
      },
    },
  });
};


// get Rentals
const getRentals = async() => {
  return await db.query.Rental.findMany({
    with:{
      customer:{
        columns:{
          firstName: true,
          lastName: true
        }
      }
    }
  })
}


// Get Customers
const getCustomers = async() => {
  return await db.query.Customer.findMany()
}

// Get Cars
const getCars = async() => {
  return await db.query.Car.findMany();
}

async function main() {
  // Fetch rentals with details

  // const rentals = await getRentalsWithDetails();
  // console.log("Rentals with details:", rentals);

  // Fetch payments with details

  const payments = await getPaymentsWithDetails();
  console.dir(payments, { depth: null });


  // Fetch Customers

  // const customers = await getCustomers();
  // console.log("All Cutomers",customers);

  // Fetch cars

  // const cars =  await getCars();
  // console.log(cars);

  // const rentals = await getRentals();
  // console.log(rentals)

}

main().catch((e) => {
  console.error("Error:", e);
  process.exit(1);
});
