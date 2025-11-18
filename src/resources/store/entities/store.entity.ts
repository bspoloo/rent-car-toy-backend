import { IsString, IsUUID } from "class-validator";
import { AuditableEntity } from "src/config/auditable_entity.class";
import { Car } from "src/resources/car/entities/car.entity";
import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('stores')
export class Store extends AuditableEntity {
    @IsUUID()
    @PrimaryGeneratedColumn('uuid')
    id: string

    @IsString()
    @Column({ type: 'varchar', length: 200 })
    name: string;

    @IsString()
    @Column({ type: 'text' })
    description: string;

    @IsString()
    @Column({ type: 'text' })
    image: string;

    @IsString()
    @Column({ type: 'varchar' , length: 200})
    location: string;

    @OneToMany( () => Car, car => car.store)
    cars: Car[]
}
