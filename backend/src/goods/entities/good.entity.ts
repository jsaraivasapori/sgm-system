import { ApiProperty } from '@nestjs/swagger';
import { ProcessCodevasf } from '../../processes-codevasf/entities/process-codevasf.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('goods')
export class Good {
  @ApiProperty({ example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: true,
    description: 'Indica se o registro não foi deletado.',
  })
  @Column({ default: true, name: 'is_active' }) // Coluna que salva o estado ativo ou inativo para softDelete
  isActive: boolean;

  @ApiProperty({ example: 'Trator Agrícola 75cv' })
  @Column({ unique: true })
  name: string; // Ex: "Trator Agrícola 75cv", "Kit Irrigação"

  @ApiProperty({ example: 'Descrição do trator...', nullable: true })
  @Column({ nullable: true })
  description: string;

  @ApiProperty({ example: 150000.0, nullable: true })
  @Column('decimal', { precision: 12, scale: 2, nullable: true }) // 'decimal' volta como string no JS. Lembrar de converter se for fazer cálculos
  estimatedValue: number;

  @OneToMany(() => ProcessCodevasf, (process) => process.good)
  processes: ProcessCodevasf[];
}
