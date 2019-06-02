import { Vehicle } from 'src/user/entity/vehicle.entity';
import { Point } from 'geojson';
import { PlanType } from 'src/user/interface/plan.enum';

export class DtoCalloutInfo {
  id: string;

  customerName: string;

  customerId: string;

  vehicle: Vehicle;

  description: string;

  location: Point;

  address: string;

  plan: PlanType;

  price?: number;

  customerPhone: string;
}
