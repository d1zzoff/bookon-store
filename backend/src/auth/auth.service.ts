import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthEntity } from './entity/auth.entity';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string): Promise<AuthEntity> {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new UnauthorizedException('Invalid login or password');
    }

    const isPassValid = await bcrypt.compare(password, user.password);

    if (!isPassValid) {
      throw new UnauthorizedException('Invalid login or password');
    }

    const accessToken = this.jwtService.sign({ userId: user.id });

    return {
      accessToken,
    };
  }

  async register(body: RegisterDto): Promise<AuthEntity> {
    const hashedPass = await bcrypt.hash(body.password, 10);

    const user = await this.prisma.user.create({
      data: {
        ...body,
        password: hashedPass,
      },
    });

    const accessToken = this.jwtService.sign({ userId: user.id });

    return {
      accessToken,
    };
  }
}
