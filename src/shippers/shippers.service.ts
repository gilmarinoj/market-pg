import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateShipperDto } from './dto/create-shipper.dto';
import { UpdateShipperDto } from './dto/update-shipper.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ShipperEntity } from './entities/shipper.entity';
import { Repository, UpdateResult } from 'typeorm';
import { ApiAllResponse, ApiOneResponse } from 'src/common/interfaces/api-response.interface';
import { ManagerError } from 'src/common/errors/manager.error';
import { PaginationDto } from 'src/common/dtos/pagination/pagination.dto';

@Injectable()
export class ShippersService {
  constructor(
    @InjectRepository(ShipperEntity)
    private readonly shipperRepository: Repository<ShipperEntity>
  ) { }
  async create(createShipperDto: CreateShipperDto): Promise<ApiOneResponse<ShipperEntity>> {

    try {
      const shipper = await this.shipperRepository.save(createShipperDto)
      if (!shipper) {
        throw new ManagerError({
          type: 'CONFLICT',
          message: 'Shipper not created!',
        })
      }

      return {
        status: {
          statusMsg: 'CREATED',
          statusCode: HttpStatus.CREATED,
          error: null,
        },
        data: shipper,
      };
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async findAll(paginationDto: PaginationDto): Promise<ApiAllResponse<ShipperEntity>> {
    const { limit, page } = paginationDto;
    const skip = (page - 1) * limit;

    try {
      const [total, data] = await Promise.all([
        this.shipperRepository.count({ where: { isActive: true } }),
        this.shipperRepository.createQueryBuilder('shipper')
          .where({ isActive: true })
          .leftJoinAndSelect('shipper.orders', 'orders')
          .take(limit)
          .skip(skip)
          .getMany()
      ]);

      const lastPage = Math.ceil(total / limit);

      return {
        status: {
          statusMsg: "OK",
          statusCode: HttpStatus.OK,
          error: null,
        },
        meta: {
          page,
          limit,
          lastPage,
          total,
        },
        data,
      };
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async findOne(id: string): Promise<ApiOneResponse<ShipperEntity>> {
    try {
      const shipper = await this.shipperRepository.createQueryBuilder('shipper')
        .leftJoinAndSelect('shipper.orders', 'orders')
        .where({ id, isActive: true })
        .getOne()
      if (!shipper) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: "Shipper not found",
        })
      }

      return {
        status: {
          statusMsg: 'OK',
          statusCode: HttpStatus.OK,
          error: null,
        },
        data: shipper,
      }
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async update(id: string, updateShipperDto: UpdateShipperDto): Promise<ApiOneResponse<UpdateResult>> {
    try {
      const shipper = await this.shipperRepository.update({ id, isActive: true }, updateShipperDto)
      if (shipper.affected === 0) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: 'Shipper not found',
        });
      }

      return {
        status: {
          statusMsg: "OK",
          statusCode: HttpStatus.OK,
          error: null,
        },
        data: shipper,
      };
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async remove(id: string): Promise<ApiOneResponse<UpdateResult>> {
    try {
      const shipper = await this.shipperRepository.update({ id, isActive: true }, { isActive: false });
      if (shipper.affected === 0) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: 'Shipper not found',
        });
      }

      return {
        status: {
          statusMsg: "OK",
          statusCode: HttpStatus.OK,
          error: null,
        },
        data: shipper,
      };
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }
}
