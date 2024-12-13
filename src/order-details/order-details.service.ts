import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order-detail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDetailEntity } from './entities/order-detail.entity';
import { Repository, UpdateResult } from 'typeorm';
import { ApiAllResponse, ApiOneResponse } from 'src/common/interfaces/api-response.interface';
import { ManagerError } from 'src/common/errors/manager.error';
import { PaginationDto } from 'src/common/dtos/pagination/pagination.dto';

@Injectable()
export class OrderDetailsService {
  constructor(
    @InjectRepository(OrderDetailEntity)
    private readonly orderDetailRepository: Repository<OrderDetailEntity>,
  ) { }

  async create(createOrderDetailDto: CreateOrderDetailDto): Promise<ApiOneResponse<OrderDetailEntity>> {

    try {
      const orderDetail = await this.orderDetailRepository.save(createOrderDetailDto)
      if (!orderDetail) {
        throw new ManagerError({
          type: 'CONFLICT',
          message: 'OrderDetail not created!',
        })
      }

      return {
        status: {
          statusMsg: 'CREATED',
          statusCode: HttpStatus.CREATED,
          error: null,
        },
        data: orderDetail,
      };
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async findAll(paginationDto: PaginationDto): Promise<ApiAllResponse<OrderDetailEntity>> {
    const { limit, page } = paginationDto;
    const skip = (page - 1) * limit;

    try {

      const [total, data] = await Promise.all([
        this.orderDetailRepository.count({ where: { isActive: true } }),
        this.orderDetailRepository.createQueryBuilder("orderDetails")
          .leftJoinAndSelect('orderDetails.order', 'order')
          .leftJoinAndSelect('orderDetails.product', 'product')
          .where({ isActive: true })
          .skip(skip)
          .limit(limit)
          .getMany(),
      ]);
      const lastPage = Math.ceil(page / limit);
      return {
        status: {
          statusMsg: "OK",
          statusCode: HttpStatus.OK,
          error: null,
        },
        meta: {
          page,
          lastPage,
          limit,
          total
        },
        data
      }
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async findOne(id: string): Promise<ApiOneResponse<OrderDetailEntity>> {
    try {
      const orderDetail = await this.orderDetailRepository.createQueryBuilder('orderDetails')
        .where({ id, isActive: true })
        .leftJoinAndSelect('orderDetails.order', 'order')
        .leftJoinAndSelect('orderDetails.product', 'product')
        .getOne()
      if (!orderDetail) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: "OrderDetail not found",
        })
      }

      return {
        status: {
          statusMsg: 'OK',
          statusCode: HttpStatus.OK,
          error: null,
        },
        data: orderDetail,
      }
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async update(id: string, updateOrderDetailDto: UpdateOrderDetailDto): Promise<ApiOneResponse<UpdateResult>> {
    try {
      const orderDetail = await this.orderDetailRepository.update({ id, isActive: true }, updateOrderDetailDto)
      if (orderDetail.affected === 0) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: 'OrderDetail not found',
        });
      }

      return {
        status: {
          statusMsg: "OK",
          statusCode: HttpStatus.OK,
          error: null,
        },
        data: orderDetail,
      };
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async remove(id: string): Promise<ApiOneResponse<UpdateResult>> {
    try {
      const OrderDetail = await this.orderDetailRepository.update({ id, isActive: true }, { isActive: false });
      if (OrderDetail.affected === 0) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: 'OrderDetail not found',
        });
      }

      return {
        status: {
          statusMsg: "OK",
          statusCode: HttpStatus.OK,
          error: null,
        },
        data: OrderDetail,
      };
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }
}
