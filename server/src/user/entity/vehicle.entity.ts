import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Customer } from './customer.entity';

@Entity()
export class Vehicle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  model: string;

  @Column({ unique: true })
  plateNumber: string;

  @ManyToOne(type => Customer, customer => customer.vehicles)
  customer: Customer;
}
