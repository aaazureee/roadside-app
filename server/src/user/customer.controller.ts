import {
  Controller,
  Post,
  Body,
  Session,
  Get,
  UseGuards,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { DtoCustomerDetails } from './dto/customer-details.dto';
import { ISession } from 'src/auth/session.interface';
import {
  EndpointResponse,
  ResponseSuccess,
  ResponseError,
} from 'src/server-response.dto';
import { Customer } from './entity/customer.entity';
import { RoleGuard } from 'src/auth/auth.guard';
import { RequiresRoles } from 'src/auth/roles.decorator';

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
}
