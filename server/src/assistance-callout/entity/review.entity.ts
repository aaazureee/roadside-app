import { Column } from 'typeorm';

export class Review {
  @Column({ type: 'integer', nullable: true })
  rating: number;

  @Column({ nullable: true })
  comment: string;
}
