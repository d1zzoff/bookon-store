import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @IsArray()
  @ApiProperty()
  images: string[];

  @IsNotEmpty()
  @MinLength(5)
  @IsString()
  @ApiProperty()
  title: string;

  @IsString()
  @IsOptional()
  @MaxLength(300)
  @ApiProperty({ required: false })
  description?: string;

  @Min(0)
  @Max(9999)
  @IsNotEmpty()
  @ApiProperty()
  price: number;

  @Min(0)
  @IsNotEmpty()
  @ApiProperty()
  count: number;

  @IsNotEmpty()
  @ApiProperty()
  categoryId: number;

  @IsNotEmpty()
  @ApiProperty()
  languageId: number;

  @IsString()
  @IsOptional()
  link: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  author: string;
}
