import { createReadStream } from 'fs';
import { parse } from 'papaparse';
import { join } from 'path';
import {
  getConnection,
  getManager,
  getCustomRepository,
  createConnection,
} from 'typeorm';
import { UserRepository } from '../src/user/repository/user.repository';
import { UserRole } from '../src/user/user-role.interface';
import { CustomerRepository } from '../src/user/repository/customer.repository';

const PASSWORD = '123';

interface CustomerMock {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  creditCardCardNumber: string;
  creditCardExpiremonth: string;
  creditCardExpireyear: string;
  plan: string;
  creditCardName: string;
  creditCardCcv: string;
  make: string;
  model: string;
  plateNumber: string;
}

async function main() {
  const connection = await createConnection();

  const customerFile = createReadStream(
    join(__dirname, './resources/mock_customer.csv'),
  );

  console.log('Started');
  const res = parse(customerFile, {
    header: true,
    complete: function(results) {
      const data = results.data as CustomerMock[];
      data.forEach(cust => createCustomer(cust));
    },
  });
}

async function createCustomer(customer: CustomerMock) {
  const userRepo = getCustomRepository(UserRepository);
  const custRepo = getCustomRepository(CustomerRepository);

  const newUser = await userRepo.registerUser(
    UserRole.CUSTOMER,
    customer.email,
    PASSWORD,
  );

  const newCust = await custRepo.setCustomerDetails(newUser.id, {
    firstName: customer.firstName,
    lastName: customer.lastName,
    address: customer.address,
    phone: customer.phone,
  });

  await custRepo.setCreditCard(newCust.userId, {
    cardNumber: customer.creditCardCardNumber,
    ccv: customer.creditCardCcv,
    name: customer.creditCardName,
    expireMonth: (customer.creditCardExpiremonth as unknown) as number,
    expireYear: (customer.creditCardExpireyear as unknown) as number,
  });

  await custRepo.addVehicles(newCust.userId, [
    {
      make: customer.make,
      model: customer.model,
      plateNumber: customer.plateNumber,
    },
  ]);

  console.log('Inserted 1 customer');
}

main();
