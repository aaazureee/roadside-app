import { Column } from 'typeorm';

export class Review {
  @Column({ type: 'integer' })
  rating: number;

  @Column({ nullable: true })
  comment: string;
}
