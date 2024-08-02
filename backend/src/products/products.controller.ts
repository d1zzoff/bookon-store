import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  NotFoundException,
  Query,
  Logger,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ProductEntity } from './entities/product.entity';
import { OptionalAuthGuard } from 'src/auth/optional-jwt.guard';

@Controller('products')
@ApiTags('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get(':uuid')
  @ApiOkResponse({ type: ProductEntity })
  async findOne(@Req() req, @Param('uuid') uuid: string) {
    const userId = req.user?.id;
    const cartToken = req.cookies?.cartToken;

    return await this.productsService.findOne({ uuid, userId, cartToken });
  }

  @Post()
  @ApiCreatedResponse({ type: ProductEntity })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @UseGuards(OptionalAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: ProductEntity, isArray: true })
  findAll(
    @Req() req,
    @Query('minPrice') minPrice?: string,
    @Query('maxPrice') maxPrice?: string,
    @Query('languages') languages?: string,
    @Query('categories') categories?: string,
    @Query('sort') sort?: string,
    @Query('search') search?: string,
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ) {
    const userId = req.user?.id;
    const cartToken = req.cookies?.cartToken;

    return this.productsService.findAll({
      minPrice: minPrice ? parseInt(minPrice, 10) : undefined,
      maxPrice: maxPrice ? parseInt(maxPrice, 10) : undefined,
      languages: languages ? languages.split(',') : undefined,
      categories: categories ? categories.split(',') : undefined,
      search: search || undefined,
      offset: offset ? parseInt(offset, 10) : 0,
      limit: limit ? parseInt(limit, 10) : 15,
      userId,
      cartToken,
      sort,
    });
  }

  @Patch(':id')
  @ApiOkResponse({ type: ProductEntity })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: ProductEntity })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.remove(id);
  }
}
