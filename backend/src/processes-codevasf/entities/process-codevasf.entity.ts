import { ProcessCodevasfStatus } from 'common/enums/process-codevasf-status.enum';
import { Beneficiary } from 'src/beneficiaries/entities/beneficiary.entity';
import { Good } from '../../goods/entities/good.entity';
import { Supporter } from 'src/supporters/entities/supporter.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProcessCodevasfHistory } from './process-codevasf-history.entity';

@Entity('process_codevasf')
export class ProcessCodevasf {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  nup: string;

  @Column('text', { nullable: true })
  description: string;

  @Column('decimal', { precision: 12, scale: 2 })
  value: number;

  @Column({
    type: 'enum',
    enum: ProcessCodevasfStatus,
    default: ProcessCodevasfStatus.TRIAGEM,
  })
  status: ProcessCodevasfStatus;

  // --- RELACIONAMENTOS ---

  @ManyToOne(() => Good, (good) => good.processes)
  @JoinColumn({ name: 'good_id' })
  good: Good;

  @ManyToOne(() => Beneficiary, (beneficiary) => beneficiary.processes)
  @JoinColumn({ name: 'beneficiary_id' })
  beneficiary: Beneficiary;

  @ManyToOne(() => Supporter, (supporter) => supporter.processes, {
    nullable: true,
  })
  @JoinColumn({ name: 'supporter_id' })
  supporter: Supporter;

  // --- AUDITORIA ---

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'created_by_id' })
  createdBy: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'updated_by_id' })
  updatedBy: User;

  @OneToMany(() => ProcessCodevasfHistory, (history) => history.process)
  history: ProcessCodevasfHistory[];
}
