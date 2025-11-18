import { IsBoolean, IsNumber, IsString, IsUUID } from "class-validator";
import { AuditableEntity } from "src/config/auditable_entity.class";
import { Rent } from "src/resources/rents/entities/rent.entity";
import { Store } from "src/resources/store/entities/store.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('cars')
export class Car extends AuditableEntity {
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

    @IsNumber()
    @Column({ type: 'double' })
    price: number;

    @IsString()
    @Column({ type: 'varchar', default: "127.0.0.1", length: 20 })
    ip: string;

    @IsBoolean()
    @Column({ type: 'boolean', default: true })
    is_avaible: boolean;

    @Column({ type: 'varchar', length: 200, nullable: true })
    store_id?: string

    @ManyToOne(() => Store, store => store.cars)
    @JoinColumn({ name: "store_id" })
    store: Store;

    @OneToMany(() => Rent, rent => rent.car)
    rents: Rent[]
}
