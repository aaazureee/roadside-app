import { Controller, Get, UseGuards, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { RoleGuard } from './auth/auth.guard';
import { RequiresRoles } from './auth/roles.decorator';
import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Customer } from './user/entity/customer.entity';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @InjectEntityManager() private manager: EntityManager,
  ) {}

  @Get('/myapi')
  @UseGuards(RoleGuard)
  @RequiresRoles('customer', 'admin')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/test-relation-id')
  async testRelation(): Promise<object> {
    return this.appService.testRelationId();
  }

  @Get('/ping')
  testping() {
    return {
      value: 'hello',
    };
  }

  @Get('test-credit')
  async testCredit() {
    const custs = await this.manager.find(Customer);
    Logger.log(custs, 'Test credit card');
    custs[0].creditCard = {
      cardNumber: '1111222233334444',
      name: 'sdadass',
      expireMonth: 12,
      expireYear: 2018,
      ccv: '112',
    };

    await this.manager.save(custs[0]);
    Logger.log(custs, 'Test credit card');

    return 'hi';
  }
}
