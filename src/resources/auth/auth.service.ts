import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Payload } from 'src/interfaces/payload.interface';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService
  ) { }

  public async register(registerDto: RegisterDto): Promise<{ access_token: string, refresh_token: string, user: User }> {
    const existingUser = await this.userRepository.findOne({
      where: { email: registerDto.email }
    });

    if (existingUser) {
      throw new ConflictException(`El usuario con email ${registerDto.email} ya existe`);
    }

    const user = this.userRepository.create(registerDto);
    await this.userRepository.save(user);

    const payload: Payload = {
      email: user.email,
      sub: user.id,
      role: user.roles
    };

    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign(payload),
      user: user
    };
  }

  public async login(loginDto: LoginDto): Promise<{ access_token: string, refresh_token: string, user: User }> {
    const user = await this.userRepository.findOne({
      where: {
        email: loginDto.email,
        deletedAt: IsNull()
      }
    });
    
    if (!user || !(await user.validatePassword(loginDto.password))) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload: Payload = {
      email: user.email,
      sub: user.id,
      role: user.roles
    };

    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign(payload),
      user: user
    };
  }

  public async validateUser(payload: Payload) {
    return await this.userRepository.findOne({
      where: { id: payload.sub }
    });
  }
}
