import { Module } from '@nestjs/common';
import { SupportersService } from './supporters.service';
import { SupportersController } from './supporters.controller';
import { Supporter } from './entities/supporter.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupportersRepository } from './repository/supporter.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Supporter])],
  controllers: [SupportersController],
  providers: [
    SupportersService,
    {
      provide: 'ISupportersRepository',
      useClass: SupportersRepository,
    },
  ],
})
export class SupportersModule {}
