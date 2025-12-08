import { ProcessCodevasf } from 'src/processes-codevasf/entities/process-codevasf.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('supporters')
export class Supporter {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string; // Ex: Deputado Fulano

  @Column({ nullable: true })
  phone: string;

  @Column()
  city: string; // Base eleitoral principal

  @OneToMany(() => ProcessCodevasf, (process) => process.supporter)
  processes: ProcessCodevasf[];
}
