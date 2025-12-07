import { BeneficiaryType } from 'common/enums/beneficiary-type.enum';
import { ProcessCodevasf } from 'src/processes-codevasf/entities/process-codevasf.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('beneficiaries')
export class Beneficiary {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string; // Ex: Prefeitura de Montes Claros

  @Column({ unique: true, length: 18 }) // CNPJ formatado ou não
  cnpj: string;

  @Column({ type: 'enum', enum: BeneficiaryType })
  type: BeneficiaryType;

  @Column()
  city: string;

  @Column({ default: 'MG', length: 2 })
  state: string;

  @OneToMany(() => ProcessCodevasf, (process) => process.beneficiary)
  processes: ProcessCodevasf[];
}
