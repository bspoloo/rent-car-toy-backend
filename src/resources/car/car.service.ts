import { Injectable } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Car } from './entities/car.entity';
import { IsNull, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(Car) private carRepository: Repository<Car>
  ) {}
  public async create(createCarDto: CreateCarDto): Promise<Car> {
    const newCar = this.carRepository.create(createCarDto);
    return this.carRepository.save(newCar);
  }

  findAll() {
    return `This action returns all car`;
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

  update(id: number, updateCarDto: UpdateCarDto) {
    return `This action updates a #${id} car`;
  }

  remove(id: number) {
    return `This action removes a #${id} car`;
  }
}
