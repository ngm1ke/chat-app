import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('classes')
export class Class {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'class_name', type: 'varchar' })
  className: string;

  @Column({ type: 'integer' })
  grade: number;

  @Column({ name: 'homeroom_teacher_id', nullable: true })
  homeroomTeacherId: number | null;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'homeroom_teacher_id' })
  homeroomTeacher: User | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
