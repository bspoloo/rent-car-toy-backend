import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Car } from './entities/car.entity';
import { IsNull, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CarOutputDto } from './dto/car.output.dto';

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(Car) private carRepository: Repository<Car>
  ) { }
  public async create(createCarDto: CreateCarDto): Promise<Car> {
    const newCar = this.carRepository.create(createCarDto);
    return this.carRepository.save(newCar);
  }

  public async findAll(): Promise<CarOutputDto[]> {
    const cars = await this.carRepository.find({
      where: {
        deletedAt: IsNull()
      },
      relations:["store"]
    });
    return cars;
  }
  public async findAllAvible(): Promise<CarOutputDto[]> {
    const cars = await this.carRepository.find({
      where: {
        deletedAt: IsNull(),
        is_avaible: true
      },
      relations:["store"]
    });
    return cars;
  }

  public async findOne(id: string): Promise<Car> {
    const car = await this.carRepository.findOne({
      where: {
        id: id,
        deletedAt: IsNull()
      }
    });

    if (!car) {
      throw new Error(`Autito no existente con id ${id}`)
    }
    return car;
  }

  public async update(updateCarDto: UpdateCarDto): Promise<Car> {
    const car = await this.carRepository.findOne({
      where: {
        id: updateCarDto.id,
        deletedAt: IsNull()
      }
    });
    if (!car) {
      throw new HttpException(
        `Car with id ${updateCarDto.id} not found.`,
        HttpStatus.NOT_FOUND,
      );
    }
    Object.assign(car, updateCarDto);
    return this.carRepository.save(car);
  }

  public async remove(id: string): Promise<Car> {
    const car = await this.carRepository.findOne({
      where: {
        id: id,
        deletedAt: IsNull()
      }
    });
    if (!car) {
      throw new HttpException(
        `Car with id ${id} not found.`,
        HttpStatus.NOT_FOUND,
      );
    }
    Object.assign(car, { ...car, deletedAt: new Date() });
    return this.carRepository.save(car);
  }
}
