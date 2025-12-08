import { ApiProperty } from '@nestjs/swagger';
import { SupporterRole } from 'common/enums/supporter-type.enum';
import { ProcessCodevasf } from 'src/processes-codevasf/entities/process-codevasf.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('supporters')
export class Supporter {
  @ApiProperty({ example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'João Silva ' })
  @Column()
  name: string; // Ex: Deputado Fulano

  @ApiProperty({
    enum: SupporterRole,
    example: SupporterRole.VEREADOR,
    description: 'O papel político ou social do apoiador',
  })
  @Column({
    type: 'enum',
    enum: SupporterRole,
    default: SupporterRole.LIDER_COMUNITARIO, // Opcional: Define um padrão
  })
  role: SupporterRole;

  @Column()
  @ApiProperty({ example: '38999499978', nullable: true })
  @Column({ nullable: true })
  phone: string;

  @ApiProperty({ example: 'Montes Claros' })
  @Column()
  city: string; // Base eleitoral principal

  @OneToMany(() => ProcessCodevasf, (process) => process.supporter)
  processes: ProcessCodevasf[];

  // --- AUDITORIA & SOFT DELETE ---

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ApiProperty({
    description:
      'Data em que o registro foi desativado. Caso for null é porque não foi desativado',
    nullable: true,
  })
  @DeleteDateColumn({ name: 'deleted_at' }) // O TypeORM preenche isso automaticamente no softDelete
  deletedAt: Date;
}
