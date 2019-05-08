import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Callout } from './entity/callout.entity';
import { CalloutMatching } from './entity/callout-matching.entity';
import { CalloutService } from './service/callout.service';
import { CalloutController } from './callout.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Callout, CalloutMatching])],
  exports: [CalloutService],
  providers: [CalloutService],
  controllers: [CalloutController],
})
export class CalloutModule {}
