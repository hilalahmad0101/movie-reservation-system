import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('movies')
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ length: 100, nullable: true })
  genre: string;

  @Column({ type: 'int', nullable: true })
  duration: number; // in minutes

  @Column({ length: 50, nullable: true })
  language: string;

  @Column({ type: 'decimal', precision: 2, scale: 1, nullable: true })
  rating: number; // e.g. IMDb rating

  @Column({ type: 'date', nullable: true })
  release_date: Date;

  @Column({ type: 'varchar', nullable: true })
  poster_url: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
