import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProcessCodevasf } from './process-codevasf.entity';
import { User } from 'src/users/entities/user.entity';
import { ProcessCodevasfStatus } from 'common/enums/process-codevasf-status.enum';

@Entity('process_history')
export class ProcessCodevasfHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: ProcessCodevasfStatus,
    name: 'previous_status',
  })
  previousStatus: ProcessCodevasfStatus;

  @Column({ type: 'enum', enum: ProcessCodevasfStatus, name: 'new_status' })
  newStatus: ProcessCodevasfStatus;

  @Column('text', { nullable: true })
  notes: string;

  @CreateDateColumn({ name: 'changed_at' })
  changedAt: Date;

  @ManyToOne(() => ProcessCodevasf, (process) => process.history, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'process_id' })
  process: ProcessCodevasf;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'changed_by_id' })
  changedBy: User;
}
