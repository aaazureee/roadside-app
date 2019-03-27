import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { UserRole } from './interfaces';

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
}
