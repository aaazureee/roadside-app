import { DtoVehicle } from './vehicle.dto';
import { ValidateNested } from 'class-validator';

export class DtoEditVehicles {
  add: DtoVehicle[];

  edit: { id: string; make: string; model: string; plateNumber: string }[];

  remove: { id: number }[];
}
