import { createConnection, getManager, getCustomRepository } from 'typeorm';
import { getAllCustomers } from './get-entities-utils';
import { sampleOne, getRandomDate } from './utils';
import { Customer } from 'src/user/entity/customer.entity';
import {
  TransactionType,
  Transaction,
} from 'src/assistance-callout/entity/transaction.entity';
import { CustomerRepository } from 'src/user/repository/customer.repository';
import { PlanType } from 'src/user/interface/plan.enum';

let count = 0;

async function main() {
  console.log('Create connection');
  const connection = await createConnection();

  console.log('Started');

  let allCusts = await getAllCustomers();

  for (let i = 0; i < 20; i++) {
    const cust = sampleOne(allCusts);
    allCusts = allCusts.filter(el => el != cust);

    await createSubscription(cust);
  }
}

main();

async function createSubscription(customer: Customer) {
  const custRepo = getCustomRepository(CustomerRepository);

  await custRepo.update(customer.userId, { plan: PlanType.PREMIUM });
  //Create transaction
  const transaction = getManager().create(Transaction, {
    amount: 59.99,
    customerId: customer.userId,
    dateCreated: getRandomDate(),
    type: TransactionType.SUBSCRIPTION,
  });

  await getManager().save(transaction);
  count++;
  console.log(`Created ${count} SUBSCRIPTION`);
}
