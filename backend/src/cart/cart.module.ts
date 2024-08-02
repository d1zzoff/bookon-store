import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { OptionalJwtStrategy } from 'src/auth/strategy/optional-jwt.strategy';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [PrismaModule, UsersModule],
  controllers: [CartController],
  providers: [CartService, OptionalJwtStrategy],
})
export class CartModule {}
