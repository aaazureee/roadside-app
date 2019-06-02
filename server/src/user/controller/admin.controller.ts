import { Controller, Get, UseGuards } from '@nestjs/common';
import { RoleGuard } from 'src/auth/auth.guard';
import { RequiresRoles } from 'src/auth/roles.decorator';
import { TransactionService } from 'src/assistance-callout/service/transaction.service';
import { ResponseSuccess } from 'src/server-response.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get('service-payments')
  @UseGuards(RoleGuard)
  @RequiresRoles('admin')
  async getAllServicePayments() {
    const payments = await this.transactionService.getAllServicePayments();

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

  @Get('subscriptions')
  @UseGuards(RoleGuard)
  @RequiresRoles('admin')
  async getAllSubscriptions() {
    const subs = await this.transactionService.getAllSubscriptions();

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
