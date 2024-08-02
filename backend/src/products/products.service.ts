import { Injectable, Logger } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import slugify from 'slugify';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  private readonly logger = new Logger(ProductsService.name);

  private generateSlug(title: string): string {
    const slug = slugify(title, {
      lower: true,
      strict: true,
      locale: 'ru',
    });

    return slug;
  }

  create(createProductDto: CreateProductDto) {
    const link = this.generateSlug(createProductDto.title);

    return this.prisma.product.create({
      data: {
        ...createProductDto,
        link,
      },
    });
  }

  async findAll(query?: {
    minPrice?: number;
    maxPrice?: number;
    languages?: string[];
    categories?: string[];
    sort?: string;
    search?: string;
    limit?: number;
    offset?: number;
    cartToken?: string;
    userId?: number;
  }) {
    const where: any = {
      count: { gt: 0 },
    };

    if (query?.search !== undefined) {
      where.title = { contains: query.search, mode: 'insensitive' };
    }

    if (query?.minPrice !== undefined) {
      where.price = { ...where.price, gte: query.minPrice };
    }
    if (query?.maxPrice !== undefined) {
      where.price = { ...where.price, lte: query.maxPrice };
    }
    if (query?.languages !== undefined) {
      where.language = { value: { in: query.languages } };
    }
    if (query?.categories !== undefined) {
      where.category = { value: { in: query.categories } };
    }

    let orderBy: any = {};

    if (!query?.sort || query?.sort === undefined) {
      orderBy['createdAt'] = 'asc';
    } else if (query?.sort === 'rating') {
      orderBy['rating'] = 'desc';
    } else if (query?.sort === 'low_price') {
      orderBy['price'] = 'asc';
    } else if (query?.sort === 'high_price') {
      orderBy['price'] = 'desc';
    }

    const products = await this.prisma.product.findMany({
      where,
      include: {
        category: true,
        language: true,
        cartItems: {
          where: {
            OR: [{ userId: query?.userId }, { token: query?.cartToken }],
          },
        },
      },
      orderBy: query?.sort ? [orderBy] : undefined,
      take: query?.limit || 15,
      skip: query?.offset || 0,
    });

    const productsWithInCart = products.map((product) => ({
      ...product,
      inCart: product.cartItems && product.cartItems.length > 0,
    }));

    return productsWithInCart;
  }

  async findOne(query: { uuid: string; userId: number; cartToken: string }) {
    const data = await this.prisma.product.findUnique({
      where: { link: query.uuid },
      include: {
        category: true,
        language: true,
        cartItems: {
          where: {
            OR: [{ userId: query.userId }, { token: query.cartToken }],
          },
        },
      },
    });

    if (!data) {
      return null;
    }

    const newData = {
      ...data,
      inCart: data.cartItems && data.cartItems.length > 0,
    };

    delete newData.cartItems;

    return newData;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return this.prisma.product.update({
      where: { id },
      data: updateProductDto,
    });
  }

  remove(id: number) {
    return this.prisma.product.delete({ where: { id } });
  }
}
