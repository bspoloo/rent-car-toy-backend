import { AuditableEntity } from 'src/config/auditable_entity.class';
import { Car } from 'src/resources/car/entities/car.entity';
import { User } from 'src/resources/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('rents')
export class Rent extends AuditableEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: 'varchar', nullable: false })
    user_id: string;

    @Column({ type: 'varchar', nullable: false })
    car_id: string;

    @ManyToOne(() => User, user => user.rents)
    @JoinColumn({ name: "user_id" })
    user: User;

    @ManyToOne(() => Car, car => car.rents)
    @JoinColumn({ name: "car_id" })
    car: Car;
}
