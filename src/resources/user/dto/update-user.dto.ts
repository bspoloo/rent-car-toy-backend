import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ROLES } from 'src/enums/roles.enum';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    id: string
    name: string;
    username: string;
    email: string;
    roles: ROLES;
}
