import { Point } from 'geojson';

export class DtoAcceptedProfessional {
  professionalId: string;
  price: number;
  phone: string;
  address: string;
  fullName: string;
  location: Point;
}
