import { Entity, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { Customer } from 'src/user/entity/customer.entity';
import { Professional } from 'src/user/entity/professional.entity';
import { Callout } from './callout.entity';

export enum TransactionType {
  SUBSCRIPTION = 'SUBSCRIPTION',
  SERVICE_PAYMENT = 'SERVICE_PAYMENT',
}

@Entity()
export class Transaction {
  @ManyToOne(type => Customer)
  customer: Customer;

  @Column({ type: 'uuid' })
  customerId: string;

  @Column({ type: 'decimal' })
  amount: number;

  @ManyToOne(type => Professional, { nullable: true })
  professional?: Professional;

  @Column({ type: 'uuid', nullable: true })
  professionalId?: string;

  @Column({ type: 'enum', enum: TransactionType })
  type: TransactionType;

  @Column({ type: 'timestamp' })
  dateCreated: Date;

  @OneToOne(type => Callout, { nullable: true })
  @JoinColumn({ name: 'calloutId' })
  callout: Callout;

  @Column({ type: 'uuid', nullable: true })
  calloutId?: string;
}
