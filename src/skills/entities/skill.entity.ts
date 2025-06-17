import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('skills')
export class Skill {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 255 })
  name: string;

  @Column({ length: 100, nullable: true })
  category?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
