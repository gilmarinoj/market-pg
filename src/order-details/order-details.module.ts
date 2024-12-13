import { Module } from '@nestjs/common';
import { OrderDetailsService } from './order-details.service';
import { OrderDetailsController } from './order-details.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { OrderDetailEntity } from './entities/order-detail.entity';

@Module({
  controllers: [OrderDetailsController],
  providers: [OrderDetailsService],
  exports: [],
  imports: [
    TypeOrmModule.forFeature([OrderDetailEntity]),
    AuthModule,
    UsersModule,
  ]
})
export class OrderDetailsModule {}
