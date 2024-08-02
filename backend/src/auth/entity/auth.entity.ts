import { ApiProperty } from '@nestjs/swagger';

export class AuthEntity {
  @ApiProperty()
  accessToken: string;
}

export class SessionEntity {
  @ApiProperty()
  email: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  id: number;
}
