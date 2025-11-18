export class CreateCarDto {
    name: string;
    description: string;
    image: string;
    price: number;
    ip: string;
    is_avaible: boolean;
    store_id?: string;
}
