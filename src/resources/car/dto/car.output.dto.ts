import { Store } from "src/resources/store/entities/store.entity";

export class CarOutputDto {
    name: string;
    description: string;
    image: string;
    price: number;
    ip: string;
    is_avaible: boolean;
    store?: Store
}