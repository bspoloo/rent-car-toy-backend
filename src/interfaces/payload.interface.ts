import { ROLES } from "src/enums/roles.enum";
import { User } from "src/resources/user/entities/user.entity";

export interface Payload {
    email: string,
    sub: string,
    role: ROLES
}