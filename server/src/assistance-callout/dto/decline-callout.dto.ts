import { IsUUID } from 'class-validator';

export class DtoDeclineCallout {
  @IsUUID()
  id: string;
}
