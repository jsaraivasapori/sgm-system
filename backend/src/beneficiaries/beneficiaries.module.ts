import { Module } from '@nestjs/common';
import { BeneficiariesService } from './beneficiaries.service';
import { BeneficiariesController } from './beneficiaries.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Beneficiary } from './entities/beneficiary.entity';
import { BeneficiariesRepository } from './repository/benefeciary.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Beneficiary])],
  controllers: [BeneficiariesController],
  providers: [
    BeneficiariesService,
    {
      provide: 'IBeneficiariesRepository',
      useClass: BeneficiariesRepository,
    },
  ],
  exports: [BeneficiariesService],
})
export class BeneficiariesModule {}
