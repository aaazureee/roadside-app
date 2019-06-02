import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Callout } from './entity/callout.entity';
import { CalloutMatching } from './entity/callout-matching.entity';
import { CalloutService } from './service/callout.service';
import { CalloutController } from './callout.controller';
import { Transaction } from './entity/transaction.entity';
import { ReviewService } from './service/review.service';
import { TransactionService } from './service/transaction.service';

@Module({
  imports: [TypeOrmModule.forFeature([Callout, CalloutMatching, Transaction])],
  exports: [CalloutService, ReviewService, TransactionService],
  providers: [CalloutService, ReviewService, TransactionService],
  controllers: [CalloutController],
})
export class CalloutModule {}
