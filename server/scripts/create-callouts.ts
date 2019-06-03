import {
  getConnection,
  getManager,
  getCustomRepository,
  createConnection,
} from 'typeorm';
import { Callout } from 'src/assistance-callout/entity/callout.entity';
import {
  Transaction,
  TransactionType,
} from 'src/assistance-callout/entity/transaction.entity';
import { Customer } from 'src/user/entity/customer.entity';
import { Professional } from 'src/user/entity/professional.entity';
import { sampleOne, getRandomDate, addHoursToDate } from './utils';
import { mockLocations } from './resources/mock_locations';
import { getAllCustomers, getAllProfs } from './get-entities-utils';

let count = 0;

async function main() {
  console.log('Create connection');
  const connection = await createConnection();

  console.log('Started');

  const allCusts = await getAllCustomers();
  const allProfs = await getAllProfs();

  for (let i = 0; i < 1000; i++) {
    const cust = sampleOne(allCusts);
    const prof = sampleOne(allProfs);
    await createCompletedCallout(cust, prof);
    count++;
    console.log(`Created ${count} callout`);
  }
}

main();

async function createCompletedCallout(customer: Customer, prof: Professional) {
  const mockDescs = ['Car out of battery', 'Punctured tire', 'Car out of gas'];
  const mockPrice = sampleOne([15, 20, 30, 35, 9]);
  const mockRatings = [3, 4, 5];
  const mockLoc = sampleOne(mockLocations);
  const createdDate = getRandomDate();
  const completedDate = addHoursToDate(createdDate, 4);
  const callout = getManager().create(Callout, {
    acceptedProfessionalId: prof.userId,
    address: mockLoc.address,
    createdDate,
    completedDate,
    customerId: customer.userId,
    description: sampleOne(mockDescs),
    isCompleted: true,
    location: mockLoc.point,
    price: mockPrice,
    review: {
      comment: 'Good service',
      rating: sampleOne(mockRatings),
    },
    vehicleId: customer.vehicles[0].id,
  });

  const savedCallout = await getManager().save(callout);

  //Create transaction
  const transaction = getManager().create(Transaction, {
    amount: mockPrice,
    calloutId: savedCallout.id,
    customerId: savedCallout.customerId,
    dateCreated: completedDate,
    professionalId: callout.acceptedProfessionalId,
    type: TransactionType.SERVICE_PAYMENT,
    waived: false,
  });

  await getManager().save(transaction);
}
