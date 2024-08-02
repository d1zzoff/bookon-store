import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';
import { NewItemDto } from './dto/new-item.dto';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  async newItem(data: NewItemDto) {
    let token = data.token;

    if (!data.userId && !data.token) {
      token = uuidv4();
    }

    const cartItem = await this.prisma.cartItem.create({
      data: {
        userId: data.userId,
        token: token,
        productId: data.productId,
      },
    });

    return { cartItem, token };
  }

  async getItems(userId: number, token: string) {
    const cartItems = await this.prisma.cartItem.findMany({
      where: {
        OR: [{ userId }, { token }],
      },
      include: {
        product: true,
      },
    });

    return cartItems;
  }

  async increaseQuantity(userId: number, token: string, productId: number) {
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new Error('Product not found');
    }

    const cartItem = await this.prisma.cartItem.findFirst({
      where: {
        userId,
        token,
        productId,
      },
    });

    if (!cartItem) {
      throw new Error('Cart item not found');
    }

    const newQuantity = cartItem.quantity + 1;

    if (newQuantity > product.count) {
      throw new Error('Quantity exceeds available stock');
    }

    const updatedCartItem = await this.prisma.cartItem.update({
      where: { id: cartItem.id },
      data: { quantity: newQuantity },
    });

    return updatedCartItem;
  }

  async decreaseQuantity(userId: number, token: string, productId: number) {
    const cartItem = await this.prisma.cartItem.findFirst({
      where: {
        userId,
        token,
        productId,
      },
    });

    if (!cartItem) {
      throw new Error('Cart item not found');
    }

    if (cartItem.quantity > 1) {
      const updatedCartItem = await this.prisma.cartItem.update({
        where: { id: cartItem.id },
        data: { quantity: { decrement: 1 } },
      });

      return updatedCartItem;
    } else {
      await this.prisma.cartItem.delete({
        where: { id: cartItem.id },
      });

      return { deleted: true };
    }
  }
}
