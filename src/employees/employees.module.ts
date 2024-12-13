import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeEntity } from './entities/employee.entity';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [EmployeesController],
  providers: [EmployeesService],
  exports: [],
  imports: [
    TypeOrmModule.forFeature([EmployeeEntity]),
    AuthModule,
    UsersModule,
  ]
})
export class EmployeesModule { }
