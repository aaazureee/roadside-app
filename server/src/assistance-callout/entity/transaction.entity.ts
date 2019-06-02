import {
  Entity,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Customer } from 'src/user/entity/customer.entity';
import { Professional } from 'src/user/entity/professional.entity';
import { Callout } from './callout.entity';

export enum TransactionType {
  SUBSCRIPTION = 'SUBSCRIPTION',
  SERVICE_PAYMENT = 'SERVICE_PAYMENT',
}

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(type => Customer)
  @JoinColumn({ name: 'customerId' })
  customer: Customer;

  @Column({ type: 'uuid' })
  customerId: string;

  @Column({ type: 'decimal' })
  amount: number;

  @ManyToOne(type => Professional, { nullable: true })
  @JoinColumn({ name: 'professionalId' })
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

  @Column()
  waived: boolean;
}
