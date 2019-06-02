import { Module } from '@nestjs/common';
import { UserRepository } from './repository/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerService } from './service/customer.service';
import { CustomerController } from './controller/customer.controller';
import { CustomerRepository } from './repository/customer.repository';
import { ProfessionalRepository } from './repository/professional.repository';
import { ProfessionalController } from './controller/professional.controller';
import { ProfessionalService } from './service/professional.service';
import { CalloutModule } from 'src/assistance-callout/callout.module';
import { AdminController } from './controller/admin.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserRepository,
      CustomerRepository,
      ProfessionalRepository,
    ]),
    CalloutModule,
  ],
  exports: [TypeOrmModule],
  providers: [CustomerService, ProfessionalService],
  controllers: [CustomerController, ProfessionalController, AdminController],
})
export class UserModule {}
