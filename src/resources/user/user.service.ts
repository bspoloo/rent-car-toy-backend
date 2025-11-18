import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ) { }
  public async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findOne({
      where: {
        email: createUserDto.email
      }
    });
    if (existingUser) {
      throw new Error(`Usuario ya existente con email ${createUserDto.email}`)
    }
    const createdUser = this.userRepository.create(createUserDto);
    return await this.userRepository.save(createdUser);
  }

  public async findAll(): Promise<User[]> {
    const users: User[] = await this.userRepository.find({
      where: {
        deletedAt: IsNull()
      }
    });

    return users;
  }

  public async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        id: id
      }
    });

    if (!user) {
      throw new Error(`Usuario no existente con id ${id}`)
    }
    return user;
  }

  public async update(updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        id: updateUserDto.id
      }
    });
    if (!user) {
      throw new HttpException(
        `User with id ${updateUserDto.id} not found.`,
        HttpStatus.NOT_FOUND,
      );
    }
    Object.assign(user, updateUserDto);
    return this.userRepository.save(user);
  }

  public async remove(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        id: id
      }
    });
    if (!user) {
      throw new HttpException(
        `User with id ${id} not found.`,
        HttpStatus.NOT_FOUND,
      );
    }
    user.deletedAt = new Date();
    return this.userRepository.save(user);
  }
}
