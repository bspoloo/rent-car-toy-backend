import { Module } from '@nestjs/common';
import { RentsService } from './rents.service';
import { RentsController } from './rents.controller';
import { UserService } from '../user/user.service';
import { CarService } from '../car/car.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from '../car/entities/car.entity';
import { User } from '../user/entities/user.entity';
import { Rent } from './entities/rent.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Car, User, Rent])
  ],
  controllers: [RentsController],
  providers: [RentsService, UserService, CarService],
})
export class RentsModule { }
