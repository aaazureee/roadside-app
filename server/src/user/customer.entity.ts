import { Entity, PrimaryColumn, OneToOne, JoinColumn, Column } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Customer {
  @OneToOne(type => User, user => user.customerInfo, { primary: true })
  @JoinColumn()
  user: User;

  @Column()
  phone: string;
}
