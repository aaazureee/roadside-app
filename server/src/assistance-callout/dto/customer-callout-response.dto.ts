import { DtoAcceptedProfessional } from './accepted-professional.dto';
import { Point } from 'geojson';
import { Vehicle } from 'src/user/entity/vehicle.entity';

export class DtoCustomerCalloutResponse {
  hasActiveCallout: boolean;
  calloutId?: string;
  address?: string;
  location?: Point;
  description?: string;
  vehicle?: Vehicle;
  acceptedProfessionals?: DtoAcceptedProfessional[];
  chosenProfessional?: DtoAcceptedProfessional;
}
