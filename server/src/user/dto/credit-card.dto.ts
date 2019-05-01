import { IsCreditCard, IsInt, Length, IsString } from 'class-validator';

export class DtoCreditCard {
  @IsCreditCard()
  cardNumber: string;

  @IsString()
  name: string;

  @IsInt()
  expireMonth: number;

  @IsInt()
  expireYear: number;

  @Length(3, 3)
  ccv: string;
}
