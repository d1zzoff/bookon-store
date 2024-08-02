import { ApiProperty } from '@nestjs/swagger';
import { Product } from '@prisma/client';
import { CategoryEntity } from 'src/categories/entities/category.entity';
import { LanguageEntity } from 'src/languages/entities/language.entity';

export class ProductEntity implements Product {
  @ApiProperty()
  id: number;

  @ApiProperty()
  images: string[];

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string | null;

  @ApiProperty()
  rating: number;

  @ApiProperty()
  author: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  count: number;

  @ApiProperty()
  categoryId: number;

  @ApiProperty()
  languageId: number;

  @ApiProperty()
  category: CategoryEntity;

  @ApiProperty()
  language: LanguageEntity;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  link: string;
}
