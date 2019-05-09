import {
  Controller,
  Post,
  Session,
  Body,
  HttpException,
  HttpStatus,
  UseGuards,
  Get,
  Param,
} from '@nestjs/common';
import { DtoCalloutCreate } from './dto/callout-create.dto';
import { ISession } from 'src/auth/session.interface';
import { UserRole } from 'src/user/user-role.interface';
import { CalloutService } from './service/callout.service';
import { ResponseSuccess, ResponseError } from 'src/server-response.dto';
import { RoleGuard } from 'src/auth/auth.guard';
import { RequiresRoles } from 'src/auth/roles.decorator';
import { DtoAcceptCallout } from './dto/accept-callout.dto';
import { DtoChooseProfessional } from './dto/choose-professional.dto';
import { DtoCustomerCalloutResponse } from './dto/customer-callout-response.dto';
import { DtoProfessionalCalloutResponse } from './dto/professional-callout-response.dto';
import { DtoDeclineCallout } from './dto/decline-callout.dto';

@Controller('callout')
export class CalloutController {
  constructor(private readonly calloutService: CalloutService) {}

  @Get('customer')
  @UseGuards(RoleGuard)
  @RequiresRoles('customer')
  async getCalloutStatusCust(@Session() session: ISession) {
    const { userId } = session.user;
    const currentActiveCallout = await this.calloutService.customerGetCurrentActiveCallout(
      userId,
    );
    if (
      currentActiveCallout != null &&
      currentActiveCallout.acceptedProfessionalId == null
    ) {
      //submitted but hasn't locked on prof
      const acceptedProfs = await this.calloutService.getAcceptedProfessionals(
        currentActiveCallout.id,
      );

      const res: DtoCustomerCalloutResponse = {
        hasActiveCallout: true,
        calloutId: currentActiveCallout.id,
        address: currentActiveCallout.address,
        location: currentActiveCallout.location,
        description: currentActiveCallout.description,
        vehicle: currentActiveCallout.vehicle,
        acceptedProfessionals: acceptedProfs,
      };

      return new ResponseSuccess(res);
    } else if (
      currentActiveCallout != null &&
      currentActiveCallout.acceptedProfessionalId != null
    ) {
      //submitted and chosen a professional
      const chosenProf = await this.calloutService.customerGetChosenProfessional(
        currentActiveCallout.id,
      );

      const res: DtoCustomerCalloutResponse = {
        hasActiveCallout: true,
        calloutId: currentActiveCallout.id,
        address: currentActiveCallout.address,
        location: currentActiveCallout.location,
        description: currentActiveCallout.description,
        vehicle: currentActiveCallout.vehicle,
        chosenProfessional: chosenProf,
      };

      return new ResponseSuccess(res);
    } else {
      const res: DtoCustomerCalloutResponse = {
        hasActiveCallout: false,
      };

      return new ResponseSuccess(res);
    }
  }

  @Get('professional')
  @UseGuards(RoleGuard)
  @RequiresRoles('professional')
  async getCalloutStatusProf(@Session() session: ISession) {
    const { userId } = session.user;

    const currentCallout = await this.calloutService.professionalGetInProgressCallout(
      userId,
    );

    if (currentCallout == null) {
      const calloutsInRange = await this.calloutService.getCalloutsInRange(
        userId,
      );

      const res: DtoProfessionalCalloutResponse = {
        customerConfirmed: false,
        nearbyCallouts: calloutsInRange,
      };

      return new ResponseSuccess(res);
    } else {
      const res: DtoProfessionalCalloutResponse = {
        customerConfirmed: true,
        calloutInfo: {
          id: currentCallout.id,
          address: currentCallout.address,
          location: currentCallout.location,
          customerId: currentCallout.customerId,
          customerName: currentCallout.customer.fullName,
          description: currentCallout.description,
          vehicle: currentCallout.vehicle,
          plan: currentCallout.customer.plan,
        },
      };

      return new ResponseSuccess(res);
    }
  }

  @Post('customer/create')
  @UseGuards(RoleGuard)
  @RequiresRoles('customer')
  async createCallout(
    @Body() data: DtoCalloutCreate,
    @Session() session: ISession,
  ) {
    const { userId } = session.user;

    const result = await this.calloutService.createCalloutRequest({
      customerId: userId,
      address: data.address,
      description: data.description,
      location: data.location,
      vehicleId: data.vehicleId,
    });

    return new ResponseSuccess(result);
  }

  //   @Get('professional/available-callouts')
  //   @UseGuards(RoleGuard)
  //   @RequiresRoles('professional')
  //   async getCalloutsInRange(@Session() session: ISession) {
  //     const { userId } = session.user;

  //     const result = await this.calloutService.getCalloutsInRange(userId);

  //     return new ResponseSuccess(result);
  //   }

  @Post('professional/accept-callout')
  @UseGuards(RoleGuard)
  @RequiresRoles('professional')
  async acceptCalloutRequest(
    @Body() data: DtoAcceptCallout,
    @Session() session: ISession,
  ) {
    const { userId } = session.user;

    const result = await this.calloutService.acceptCallout(
      userId,
      data.id,
      data.price,
    );

    return new ResponseSuccess({});
  }

  @Post('professional/decline-callout')
  @UseGuards(RoleGuard)
  @RequiresRoles('professional')
  async declineCalloutRequest(
    @Body() data: DtoDeclineCallout,
    @Session() session: ISession,
  ) {
    const { userId } = session.user;

    await this.calloutService.declineCallout(userId, data.id);

    return new ResponseSuccess({});
  }

  @Get('customer/callout')
  @UseGuards(RoleGuard)
  @RequiresRoles('customer')
  async getAvailableProfessionals(
    @Param('id') calloutId,
    @Session() session: ISession,
  ) {
    const { userId } = session.user;

    const result = await this.calloutService.getAcceptedProfessionals(
      calloutId,
    );

    return new ResponseSuccess(result);
  }

  @Post('customer/choose')
  @UseGuards(RoleGuard)
  @RequiresRoles('customer')
  async customerChooseProfessional(
    @Body() data: DtoChooseProfessional,
    @Session() session: ISession,
  ) {
    const { userId } = session.user;
    const activeCallout = await this.calloutService.customerGetCurrentActiveCallout(
      userId,
    );
    try {
      await this.calloutService.customerChooseProfessional(
        activeCallout.id,
        data.id,
      );
    } catch (err) {
      return new ResponseError('The selected professional is currently busy.');
    }

    return new ResponseSuccess({});
  }

  @Post('customer/complete')
  @UseGuards(RoleGuard)
  @RequiresRoles('customer')
  async customerCompleteCallout(@Session() session: ISession) {
    const { userId } = session.user;

    const activeCallout = await this.calloutService.customerGetCurrentActiveCallout(
      userId,
    );

    await this.calloutService.completeCallout(activeCallout.id);
    return new ResponseSuccess({});
  }
}
