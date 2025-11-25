import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpException,
  HttpStatus,
  Logger,
  Put
} from '@nestjs/common';
import { RentsService } from './rents.service';
import { CreateRentDto } from './dto/create-rent.dto';
import { UpdateRentDto } from './dto/update-rent.dto';
import { Rent } from './entities/rent.entity';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('rents')
export class RentsController {
  private readonly logger = new Logger(RentsController.name);

  constructor(private readonly rentsService: RentsService) { }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  public async create(@Body() createRentDto: CreateRentDto): Promise<Rent> {
    try {
      this.logger.log(`Creando renta para usuario: ${createRentDto.user_id}`);
      return await this.rentsService.create(createRentDto);
    } catch (error) {
      this.logger.error(`Error creando renta: ${error.message}`, error.stack);
      throw new HttpException(error.message, HttpStatus.CONFLICT);
    }
  }

  @Get()
  public async findAll() {
    try {
      this.logger.log('Obteniendo todas las rentas');
      return await this.rentsService.findAll();
    } catch (error) {
      this.logger.error(`Error obteniendo rentas: ${error.message}`);
      throw new HttpException(
        'Error al obtener las rentas',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get(':id')
  public async findOne(@Param('id') id: string) {
    try {
      this.logger.log(`Buscando renta con ID: ${id}`);
      return await this.rentsService.findOne(id);
    } catch (error) {
      this.logger.error(`Error buscando renta ${id}: ${error.message}`);

      if (error.message.includes('no encontrado')) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }

      throw new HttpException(
        'Error al buscar la renta',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/user/:id')
  public async getAllByUserID(@Param('id') id: string): Promise<Rent[]> {
    try {
      return this.rentsService.findByUserID(id);
    } catch (e) {
      throw new HttpException(
        'Error al actualizar la renta',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Put()
  public async update(
    @Body() updateRentDto: UpdateRentDto
  ) {
    try {
      this.logger.log(`Actualizando renta con ID: ${updateRentDto.id}`);
      return await this.rentsService.update(updateRentDto); // ← Quité el +id
    } catch (error) {
      this.logger.error(`Error actualizando renta ${updateRentDto.id}: ${error.message}`);

      if (error.message.includes('no encontrado')) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }

      throw new HttpException(
        'Error al actualizar la renta',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Delete(':id')
  public async remove(@Param('id') id: string) {
    try {
      this.logger.log(`Eliminando renta con ID: ${id}`);
      return await this.rentsService.remove(id); // ← Quité el +id
    } catch (error) {
      this.logger.error(`Error eliminando renta ${id}: ${error.message}`);

      if (error.message.includes('no encontrado')) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }

      throw new HttpException(
        'Error al eliminar la renta',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}