import {
  Controller,
  Post,
  Body,
  Session,
  Get,
  UseGuards,
  Put,
} from '@nestjs/common';
import { CustomerService } from '../service/customer.service';
import { DtoCustomerDetails } from '../dto/customer-details.dto';
import { ISession } from 'src/auth/session.interface';
import {
  EndpointResponse,
  ResponseSuccess,
  ResponseError,
} from 'src/server-response.dto';
import { Customer } from '../entity/customer.entity';
import { RoleGuard } from 'src/auth/auth.guard';
import { RequiresRoles } from 'src/auth/roles.decorator';
import { DtoCreditCard } from '../dto/credit-card.dto';
import { DtoVehicle } from '../dto/vehicle.dto';
import { PlanType } from '../interface/plan.enum';
@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post('details')
  @UseGuards(RoleGuard)
  @RequiresRoles('customer')
  async setCustomerDetails(
    @Body() details: DtoCustomerDetails,
    @Session() session: ISession,
  ): Promise<EndpointResponse<Customer>> {
    const userId = session.user.userId;

    const result = await this.customerService.setCustomerDetails(
      userId,
      details,
    );
    return result
      ? new ResponseSuccess(result)
      : new ResponseError('Could not update user details');
  }

  @Get('details')
  @UseGuards(RoleGuard)
  @RequiresRoles('customer')
  async getCustomer(@Session() session: ISession) {
    const result = await this.customerService.getCustomerById(
      session.user.userId,
    );
    return result
      ? new ResponseSuccess(result)
      : new ResponseError('Could not get user details');
  }

  @Post('credit-card')
  @UseGuards(RoleGuard)
  @RequiresRoles('customer')
  async setCreditCard(
    @Body() card: DtoCreditCard,
    @Session() session: ISession,
  ) {
    const user = await this.customerService.getCustomerById(
      session.user.userId,
    );

    if (!user) {
      return new ResponseError('Invalid user');
    }

    const result = await this.customerService.setCreditCard(
      session.user.userId,
      card,
    );
    return result
      ? new ResponseSuccess(result)
      : new ResponseError('Could not get user details');
  }

  @Post('vehicles')
  @UseGuards(RoleGuard)
  @RequiresRoles('customer')
  async addVehicles(
    @Session() session: ISession,
    @Body() vehicles: DtoVehicle[],
  ) {
    const user = await this.customerService.getCustomerById(
      session.user.userId,
    );

    if (!user) {
      return new ResponseError('Invalid user');
    }

    const result = this.customerService.addVehicles(
      session.user.userId,
      vehicles,
    );

    return result
      ? new ResponseSuccess(result)
      : new ResponseError('Could not add vehicles');
  }

  @Put('plan')
  @UseGuards(RoleGuard)
  @RequiresRoles('customer')
  async changeSubscriptionPlan(
    @Body() { newPlan }: { newPlan: PlanType },
    @Session() session: ISession,
  ) {
    const user = await this.customerService.getCustomerById(
      session.user.userId,
    );

    if (!user) {
      return new ResponseError('Invalid user');
    }

    const result = await this.customerService.changePlan(
      session.user.userId,
      newPlan,
    );

    return result
      ? new ResponseSuccess(result)
      : new ResponseError('Could not change plan');
  }
}
