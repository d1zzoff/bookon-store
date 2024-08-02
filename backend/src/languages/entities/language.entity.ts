import { ApiProperty } from '@nestjs/swagger';
import { Language } from '@prisma/client';

export class LanguageEntity implements Language {
  @ApiProperty()
  id: number;

  @ApiProperty()
  text: string;

  @ApiProperty()
  value: string;
}
