import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from 'src/users/users.service';
import { jwtSecret } from '../auth.module';

@Injectable()
export class OptionalJwtStrategy extends PassportStrategy(
  Strategy,
  'optional-jwt',
) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtSecret,
    });
  }

  async validate(payload: { userId: number }) {
    if (!payload) {
      return null;
    }

    const user = await this.usersService.findOne(payload.userId);

    if (!user) {
      return null;
    }

    return user;
  }
}
