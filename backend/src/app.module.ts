import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { GoodsModule } from './goods/goods.module';
import { BeneficiariesModule } from './beneficiaries/beneficiaries.module';
import { SupportersModule } from './supporters/supporters.module';
import { ProcessesCodevasfModule } from './processes-codevasf/processes-codevasf.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true, // Apenas para desenvolvimento
    }),
    UsersModule,
    AuthModule,
    GoodsModule,
    BeneficiariesModule,
    SupportersModule,
    ProcessesCodevasfModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
