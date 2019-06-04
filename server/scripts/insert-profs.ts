import { createReadStream } from 'fs';
import { parse } from 'papaparse';
import { join } from 'path';
import {
  getConnection,
  getManager,
  getCustomRepository,
  createConnection,
} from 'typeorm';
import { Point } from 'geojson';
import { UserRole } from 'src/user/user-role.interface';
import { UserRepository } from 'src/user/repository/user.repository';
import { CustomerRepository } from 'src/user/repository/customer.repository';
import { ProfessionalRepository } from 'src/user/repository/professional.repository';

const PASSWORD = '123';

const LOCATION: Point = {
  type: 'Point',
  coordinates: [150.8942415, -34.4243334],
};
const ADDRESS = 'Wollongong Central, Crown Street, Wollongong NSW, Australia';

class ProfessionalMock {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  workingRange: string;
  accountNumber: string;
  abn: string;
  bsb: string;
}

async function main() {
  console.log('Create connection');
  const connection = await createConnection();

  const professionalFile = createReadStream(
    join(__dirname, './resources/mock_professional.csv'),
  );

  console.log('Started');
  const res = parse(professionalFile, {
    header: true,
    complete: function(results) {
      const data = results.data as ProfessionalMock[];
      data.forEach(prof => createProf(prof));
    },
  });
}

main();

//--------------------------------------------------
async function createProf(prof: ProfessionalMock) {
  const userRepo = getCustomRepository(UserRepository);
  const profRepo = getCustomRepository(ProfessionalRepository);

  const newUser = await userRepo.registerUser(
    UserRole.PROFESSIONAL,
    prof.email,
    PASSWORD,
  );

  const newProf = await profRepo.setProfesisonalDetails(newUser.id, {
    abn: prof.abn,
    accountNumber: prof.accountNumber,
    address: ADDRESS,
    bsb: prof.bsb,
    firstName: prof.firstName,
    lastName: prof.lastName,
    location: LOCATION,
    phone: prof.phone,
    workingRange: parseInt(prof.workingRange),
  });

  console.log('Inserted 1 professional');
}
