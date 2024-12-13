import { Module } from '@nestjs/common';
import { ShippersService } from './shippers.service';
import { ShippersController } from './shippers.controller';
import { ShipperEntity } from './entities/shipper.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [ShippersController],
  providers: [ShippersService],
  exports: [],
  imports: [
    TypeOrmModule.forFeature([ShipperEntity]),
    AuthModule,
    UsersModule,
  ]
})
export class ShippersModule { }
