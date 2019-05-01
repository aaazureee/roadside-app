import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { RoleGuard } from './auth/auth.guard';
import { RequiresRoles } from './auth/roles.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

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
}
