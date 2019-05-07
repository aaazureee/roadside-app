import {
  Entity,
  PrimaryColumn,
  OneToOne,
  JoinColumn,
  Column,
  RelationId,
} from 'typeorm';
import { User } from './user.entity';
import { Point } from 'geojson';

@Entity()
export class Professional {
  @OneToOne(type => User, user => user.professionalInfo)
  @JoinColumn({ name: 'userId' })
  user: User;

  @PrimaryColumn({ type: 'uuid' })
  userId: string;

  @Column()
  phone: string;

  @Column()
  address: string;

  @Column()
  workingRange: number;

  @Column('geography')
  location: Point;

  @Column({ type: 'char', length: 11 })
  abn: string;

  @Column()
  bsb: string;

  @Column()
  accountNumber: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;
}
