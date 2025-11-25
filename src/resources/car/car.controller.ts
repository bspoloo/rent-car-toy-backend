import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { CarService } from './car.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Car } from './entities/car.entity';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { CarOutputDto } from './dto/car.output.dto';

@Controller('cars')
export class CarController {
  constructor(private readonly carService: CarService) { }

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  public async create(@Body() createCarDto: CreateCarDto): Promise<Car> {
    return this.carService.create(createCarDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  public async findAll(): Promise<CarOutputDto[]> {
    return this.carService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/avaibles')
  public async findAllAvaible(): Promise<CarOutputDto[]> {
    return this.carService.findAllAvible();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  public async findOne(@Param('id') id: string): Promise<Car> {
    return this.carService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @Put()
  public async update(@Body() updateCarDto: UpdateCarDto): Promise<Car> {
    return this.carService.update(updateCarDto);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @Delete(':id')
  public async remove(@Param('id') id: string): Promise<Car> {
    return this.carService.remove(id);
  }
}
