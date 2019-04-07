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
export class Professional {
  @OneToOne(type => User, user => user.professionalInfo)
  @JoinColumn({ name: 'userId' })
  user: User;

  @PrimaryColumn({ type: 'uuid' })
  userId: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  workingRange: number;
}
