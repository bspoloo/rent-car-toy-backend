import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CreateRentDto } from './dto/create-rent.dto';
import { UpdateRentDto } from './dto/update-rent.dto';
import { Rent } from './entities/rent.entity';
import { UserService } from '../user/user.service';
import { CarService } from '../car/car.service';
import { Car } from '../car/entities/car.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RentsService {
  constructor(
    @InjectRepository(Rent) private rentRepsitory: Repository<Rent>,
    private userService: UserService,
    private carService: CarService
  ) { }
  public async create(createRentDto: CreateRentDto): Promise<Rent> {
    const user = await this.userService.findOne(createRentDto.user_id);
    const car = await this.carService.findOne(createRentDto.car_id);
    const rent = await this.rentRepsitory.findOne({
      where: {
        car_id: createRentDto.car_id
      },
      relations: ['user']
    });
    if (rent) {
      throw new Error(`El auto ${car.name} esta esta rentado por el usuario ${rent.user.name}`);
    }
    if (!car.is_avaible) {
      throw new Error(`El auto ${car.name} no esta disponible para rentar`);
    }

    const newRent = this.rentRepsitory.create({
      user: user,
      car: car,
    });

    return this.rentRepsitory.save(newRent);
  }

  public async findAll() {
    return `This action returns all rents`;
  }

  public async findOne(id: string) {
    return `This action returns a #${id} rent`;
  }

  public async update(updateRentDto: UpdateRentDto) {
    return `This action updates a #${updateRentDto.id} rent`;
  }

  public async remove(id: string) {
    return `This action removes a #${id} rent`;
  }
}
