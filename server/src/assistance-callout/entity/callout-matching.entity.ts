import { Entity, PrimaryColumn, ManyToOne, JoinColumn, Column } from 'typeorm';
import { Callout } from './callout.entity';
import { Professional } from 'src/user/entity/professional.entity';

@Entity()
export class CalloutMatching {
  @PrimaryColumn({ type: 'uuid' })
  calloutId: string;

  @ManyToOne(type => Callout)
  @JoinColumn({ name: 'calloutId' })
  callout: Callout;

  @PrimaryColumn({ type: 'uuid' })
  professionalId: string;

  @ManyToOne(type => Professional)
  @JoinColumn({ name: 'professionalId' })
  professional: Professional;

  @Column('boolean', { default: null, nullable: true })
  accepted: boolean;

  @Column({ nullable: true })
  proposedPrice: number;
}
