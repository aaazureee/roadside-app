import { Entity, PrimaryColumn, OneToOne, JoinColumn, Column } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Professional {
  @OneToOne(type => User, user => user.professionalInfo, { primary: true })
  @JoinColumn()
  user: User;

  @Column()
  phone: string;

  @Column()
  workingRange: number;
}
