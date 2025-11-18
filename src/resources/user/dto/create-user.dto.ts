import { ROLES } from "src/enums/roles.enum";

export class CreateUserDto {
    name: string;
    username: string;
    email: string;
    roles: ROLES;
}
