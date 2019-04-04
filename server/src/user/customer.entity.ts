import {
  Entity,
  PrimaryColumn,
  OneToOne,
  JoinColumn,
  Column,
  RelationId,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Customer {
  @OneToOne(type => User, user => user.customerInfo, { primary: true })
  @JoinColumn()
  user: User;

  @RelationId((customer: Customer) => customer.user)
  userId: string;

  @Column({ nullable: true })
  phone: string;
}
