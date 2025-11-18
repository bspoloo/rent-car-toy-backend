import { PartialType } from '@nestjs/mapped-types';
import { CreateCarDto } from './create-car.dto';
import { IsUUID } from 'class-validator';

export class UpdateCarDto extends PartialType(CreateCarDto) {
    @IsUUID()
    id: string
}
