import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { OrderDetailsService } from './order-details.service';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order-detail.dto';
import { PaginationDto } from 'src/common/dtos/pagination/pagination.dto';
import { PublicAccess } from 'src/auth/decorators/public.decorator';
import { AdminAccess } from 'src/auth/decorators/admin.decorator';

@Controller('order-details')
export class OrderDetailsController {
  constructor(private readonly orderDetailsService: OrderDetailsService) {}

  @Post()
  @AdminAccess()
  create(@Body() createOrderDetailDto: CreateOrderDetailDto) {
    return this.orderDetailsService.create(createOrderDetailDto);
  }

  @Get()
  @PublicAccess()
  findAll( @Query() paginationDto: PaginationDto ) {
    return this.orderDetailsService.findAll( paginationDto );
  }

  @Get(':id')
  @PublicAccess()
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.orderDetailsService.findOne(id);
  }

  @Patch(':id')
  @AdminAccess()
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateOrderDetailDto: UpdateOrderDetailDto) {
    return this.orderDetailsService.update(id, updateOrderDetailDto);
  }

  @Delete(':id')
  @AdminAccess()
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.orderDetailsService.remove(id);
  }
}
