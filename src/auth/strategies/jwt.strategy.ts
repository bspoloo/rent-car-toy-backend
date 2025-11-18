import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "src/resources/user/entities/user.entity";
import { IsNull, Repository } from 'typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET || 'ljh123',
        });
    }
    public async validate(payload: any): Promise<User> {
        const user = await this.userRepository.findOne({
            where: {
                id: payload.sub,
                deletedAt: IsNull()
            }
        });

        if (!user) {
            throw new UnauthorizedException('Usuario no encontrado');
        }

        return user;
    }

}