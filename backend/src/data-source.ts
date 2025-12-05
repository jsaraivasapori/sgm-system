import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

// Carrega as variáveis do .env (o Nest faz isso sozinho, mas o CLI precisa dessa ajuda)
dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,

  // Onde o TypeORM vai procurar suas tabelas
  entities: ['src/**/*.entity.ts'],

  // Onde ele vai salvar os arquivos de migração
  migrations: ['src/migrations/*.ts'],

  // Importante para o CLI saber que deve sincronizar
  synchronize: false,
});
