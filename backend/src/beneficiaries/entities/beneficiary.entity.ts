import { ApiProperty } from '@nestjs/swagger';
import { BeneficiaryType } from 'common/enums/beneficiary-type.enum';
import { ProcessCodevasf } from 'src/processes-codevasf/entities/process-codevasf.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('beneficiaries')
export class Beneficiary {
  @ApiProperty({ example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'Associação dos Produtores Rurais de X' })
  @Column()
  name: string; // Ex: Prefeitura de Montes Claros

  @ApiProperty({ example: '00.000.000/0001-99', description: 'CNPJ ou CPF' })
  @Column({ unique: true }) // Importante ser único para não duplicar cadast
  document: string;

  @ApiProperty({ enum: BeneficiaryType, example: BeneficiaryType.ASSOCIACAO })
  @Column({
    type: 'enum',
    enum: BeneficiaryType,
    default: BeneficiaryType.ASSOCIACAO,
  })
  type: BeneficiaryType;

  @ApiProperty({ example: 'Comunidade Vargem Grande S/N, Ibiaí, Minas Gerais' })
  @Column({ nullable: true })
  address: string;

  @ApiProperty({ example: 'Montes Claros' })
  @Column()
  city: string;

  @OneToMany(() => ProcessCodevasf, (process) => process.beneficiary)
  processes: ProcessCodevasf[];

  // Auditoria
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
