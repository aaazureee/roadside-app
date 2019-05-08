import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { Customer } from 'src/user/entity/customer.entity';
import { Point } from 'geojson';
import { Professional } from 'src/user/entity/professional.entity';
import { Vehicle } from 'src/user/entity/vehicle.entity';
import { CalloutState } from '../callout-state.enum';

@Entity()
export class Callout {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(type => Customer, { nullable: true })
  @JoinColumn({ name: 'customerId' })
  customer: Customer;

  @Column({ type: 'uuid', nullable: true })
  customerId: string;

  @Column({ type: 'geography' })
  location: Point;

  @Column()
  address: string;

  @Column({ default: false })
  isCompleted: boolean;

  @ManyToOne(type => Professional, { nullable: true })
  @JoinColumn({ name: 'acceptedProfessionalId' })
  acceptedProfessional: Professional;

  @Column({ type: 'uuid', nullable: true })
  acceptedProfessionalId: string;

  @Column({ nullable: true })
  price: number;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(type => Vehicle)
  @JoinColumn({ name: 'vehicleId' })
  vehicle: Vehicle;

  @Column({ type: 'integer' })
  vehicleId: number;

  @CreateDateColumn()
  readonly createdDate: Date;

  @Column({ type: 'enum', enum: CalloutState, default: CalloutState.SUBMITTED })
  state: CalloutState;
}
