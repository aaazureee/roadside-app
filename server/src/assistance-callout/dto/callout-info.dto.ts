import { Vehicle } from 'src/user/entity/vehicle.entity';
import { Point } from 'geojson';

export class DtoCalloutInfo {
  id: string;

  customerName: string;

  customerId: string;

  vehicle: Vehicle;

  description: string;

  location: Point;

  address: string;
}
