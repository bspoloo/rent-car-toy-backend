import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  public async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  public async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  public async findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  public async update(@Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.userService.update(updateUserDto);
  }

  @Delete(':id')
  public async remove(@Param('id') id: string): Promise<User> {
    return this.userService.remove(id);
  }
}
