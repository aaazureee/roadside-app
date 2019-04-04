import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { UserRole } from './interfaces';
import { Customer } from './customer.entity';
import { Professional } from './professional.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash: string;

  @Column({ enum: UserRole })
  role: UserRole;

  @OneToOne(type => Customer, customer => customer.user, {
    nullable: true,
  })
  customerInfo?: Customer;

  @OneToOne(type => Professional, professional => professional.user, {
    nullable: true,
  })
  professionalInfo?: Professional;
}
