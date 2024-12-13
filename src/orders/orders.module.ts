import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { OrderEntity } from './entities/order.entity';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [],
  imports: [
    TypeOrmModule.forFeature([OrderEntity]),
    AuthModule,
    UsersModule,
  ]
})
export class OrdersModule {}
