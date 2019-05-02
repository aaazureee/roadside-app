import { Entity, Column } from 'typeorm';

//Embedded entity
export class CreditCard {
  @Column({ nullable: true })
  cardNumber: string;

  @Column({ nullable: true })
  name: string;

  @Column({ type: 'int', nullable: true })
  expireMonth: number;

  @Column({ type: 'int', nullable: true })
  expireYear: number;

  @Column({ type: 'char', length: 3, nullable: true })
  ccv: string;
}
