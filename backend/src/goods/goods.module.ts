import { Module } from '@nestjs/common';
import { GoodsService } from './goods.service';
import { GoodsController } from './goods.controller';
import { GoodsRepository } from './repository/goods.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Good } from './entities/good.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Good])],
  controllers: [GoodsController],
  providers: [
    GoodsService,
    {
      provide: 'IGoodsRepository', // Token usado no @Inject do Service. Quando alguém pedir ESTA STRING (Token) entregue useClass:GoodsRepository
      useClass: GoodsRepository, // Classe real que será instanciada
    },
  ],
  exports: [GoodsService],
})
export class GoodsModule {}
