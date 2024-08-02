import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class OptionalAuthGuard extends AuthGuard('optional-jwt') {
  handleRequest(err, user, info, context: ExecutionContext) {
    if (user) {
      return user;
    }
    return null;
  }
}
