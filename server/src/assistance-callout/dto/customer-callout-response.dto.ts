import { DtoAcceptedProfessional } from './accepted-professional.dto';

export class DtoCustomerCalloutResponse {
  hasActiveCallout: boolean;
  calloutId?: string;
  acceptedProfessionals?: DtoAcceptedProfessional[];
  chosenProfessional?: DtoAcceptedProfessional;
}
