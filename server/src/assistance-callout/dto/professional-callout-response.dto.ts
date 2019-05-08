import { DtoCalloutInfo } from './callout-info.dto';

export class DtoProfessionalCalloutResponse {
  customerConfirmed: boolean;
  nearbyCallouts?: DtoCalloutInfo[];
  calloutId?: string;
  calloutInfo?: DtoCalloutInfo;
}
