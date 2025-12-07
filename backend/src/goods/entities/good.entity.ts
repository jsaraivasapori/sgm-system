import { ProcessCodevasf } from 'src/processes-codevasf/entities/process-codevasf.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('goods')
export class Good {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string; // Ex: "Trator Agrícola 75cv", "Kit Irrigação"

  @Column({ nullable: true })
  description: string;

  // 'decimal' volta como string no JS, lembre-se de converter se for fazer cálculos
  @Column('decimal', { precision: 12, scale: 2, nullable: true })
  estimatedValue: number;

  @OneToMany(() => ProcessCodevasf, (process) => process.good)
  processes: ProcessCodevasf[];
}
