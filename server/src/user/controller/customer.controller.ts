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
import { TransactionService } from 'src/assistance-callout/service/transaction.service';
@Controller('customer')
export class CustomerController {
  constructor(
    private readonly customerService: CustomerService,
    private readonly transactionService: TransactionService,
  ) {}

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
    const result = await this.customerService.changePlan(
      session.user.userId,
      newPlan,
    );

    return result
      ? new ResponseSuccess(result)
      : new ResponseError('Could not change plan');
  }

  @Get('/service-payments')
  @UseGuards(RoleGuard)
  @RequiresRoles('customer')
  async getServicePayments(@Session() session: ISession) {
    const payments = await this.transactionService.getServicePaymentsByCustomer(
      session.user.userId,
    );

    const result = payments.map(payment => {
      const callout = payment.callout;
      const customerName = payment.customer.fullName;
      const professionalName = payment.professional.fullName;
      const date = payment.dateCreated;
      const amount = payment.amount;
      const waived = payment.waived;

      return {
        customerName,
        professionalName,
        date,
        amount,
        waived,
        calloutInfo: {
          address: callout.address,
          description: callout.description,
          vehicle: callout.vehicle,
        },
      };
    });

    return new ResponseSuccess(result);
  }

  @Get('/subscriptions')
  @UseGuards(RoleGuard)
  @RequiresRoles('customer')
  async getSubscriptions(@Session() session: ISession) {
    const subs = await this.transactionService.getSubscriptionsByCustomer(
      session.user.userId,
    );

    const result = subs.map(sub => {
      return {
        customerName: sub.customer.fullName,
        amount: sub.amount,
        date: sub.dateCreated,
      };
    });

    return new ResponseSuccess(result);
  }
}
