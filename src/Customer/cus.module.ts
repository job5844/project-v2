import { Module } from '@nestjs/common';
import { CusController } from './cus.controller';
import { CusService } from './cus.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cus } from './entity/cus.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cus])],
  controllers: [CusController],
  providers: [CusService]
})
export class CusModule {}
