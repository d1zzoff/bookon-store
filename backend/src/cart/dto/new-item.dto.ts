import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class NewItemDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  productId: number;

  userId?: number;

  token?: string;
}
