import { Controller, Get, UseGuards, Param, Body, Post } from '@nestjs/common';
import { RoleGuard } from 'src/auth/auth.guard';
import { RequiresRoles } from 'src/auth/roles.decorator';
import { TransactionService } from 'src/assistance-callout/service/transaction.service';
import { ResponseSuccess, ResponseError } from 'src/server-response.dto';
import { AdminService } from '../service/admin.service';

@Controller('admin')
@UseGuards(RoleGuard)
@RequiresRoles('admin')
export class AdminController {
  constructor(
    private readonly transactionService: TransactionService,
    private readonly adminService: AdminService,
  ) {}

  @Get('service-payments')
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

  @Post('ban')
  async banUser(@Body('userId') userId: string) {
    const success: boolean = await this.adminService.banUser(userId);

    return success
      ? new ResponseSuccess({ message: 'User has been banned' })
      : new ResponseError('Could not ban user');
  }

  @Post('unban')
  async unbanUser(@Body('userId') userId: string) {
    const success: boolean = await this.adminService.unbanUser(userId);

    return success
      ? new ResponseSuccess({ message: 'User has been unbanned' })
      : new ResponseError('Could not unban user');
  }

  @Get('customers')
  async getCustomers() {
    return await this.adminService.getAllCustomers();
  }

  @Get('professional')
  async getProfessionals() {
    return await this.adminService.getAllProfessionals();
  }
}
