import {
  Body,
  Controller,
  Get,
  Logger,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { OptionalAuthGuard } from 'src/auth/optional-jwt.guard';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { NewItemDto } from './dto/new-item.dto';
import { ProductEntity } from 'src/products/entities/product.entity';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  @UseGuards(OptionalAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse()
  async newItem(@Req() req, @Body() body: NewItemDto) {
    body.userId = req.user?.id;
    body.token = req.cookies?.cartToken;

    return this.cartService.newItem(body);
  }

  @Get()
  @UseGuards(OptionalAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: ProductEntity })
  async getItems(@Req() req) {
    const userId = req.user?.id;
    const token = req.cookies?.cartToken;

    return this.cartService.getItems(userId, token);
  }

  @Patch('increase')
  @UseGuards(OptionalAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse()
  async increaseQuantity(@Req() req, @Body() body: { productId: number }) {
    Logger.log('increase');

    const userId = req.user?.id;
    const token = req.cookies?.cartToken;

    return this.cartService.increaseQuantity(userId, token, body.productId);
  }

  @Patch('decrease')
  @UseGuards(OptionalAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse()
  async decreaseQuantity(@Req() req, @Body() body: { productId: number }) {
    const userId = req.user?.id;
    const token = req.cookies?.cartToken;

    return this.cartService.decreaseQuantity(userId, token, body.productId);
  }
}
