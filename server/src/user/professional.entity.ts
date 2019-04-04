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
  @OneToOne(type => User, user => user.professionalInfo, { primary: true })
  @JoinColumn()
  user: User;

  @RelationId((prof: Professional) => prof.user)
  userId: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  workingRange: number;
}
