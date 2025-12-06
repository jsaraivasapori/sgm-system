// src/users/entities/user.entity.ts
import { Exclude } from 'class-transformer';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' }) // Define o nome da tabela no Postgres
export class User {
  // ✅ ID como UUID automático (padrão universal)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true }) // Email não pode repetir
  email: string;

  @Exclude() //quando o NestJS transformar essa classe em JSON para enviar ao frontend, ele vai pular a senha.
  @Column()
  password: string;

  // Datas de controle (boas práticas)
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
