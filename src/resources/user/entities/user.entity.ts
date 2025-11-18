
import { IsString, IsUUID } from 'class-validator';
import bcrypt from 'node_modules/bcryptjs';
import { AuditableEntity } from 'src/config/auditable_entity.class';
import { ROLES } from 'src/enums/roles.enum';
import { Rent } from 'src/resources/rents/entities/rent.entity';
import { BeforeInsert, Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity("users")
export class User extends AuditableEntity {
    @IsUUID()
    @PrimaryGeneratedColumn('uuid')
    id: string

    @IsString()
    @Column({ type: 'varchar', length: 200 })
    name: string;

    @IsString()
    @Column({ type: 'varchar', length: 200 })
    username: string;

    @IsString()
    @Column({ type: 'varchar', length: 200 })
    password: string;

    @IsString()
    @Column({ type: 'varchar', length: 200 })
    email: string;

    @Column({ type: 'enum', enum: ROLES, default: ROLES.USER })
    roles: ROLES;

    @OneToMany(() => Rent, rent => rent.user)
    rents: Rent[]

    @BeforeInsert()
    public async hashPassword(): Promise<void> {
        this.password = await bcrypt.hash(this.password, 10);
    }

    public async validatePassword(password: string): Promise<boolean> {
        return await bcrypt.compare(password, this.password);
    }
}
