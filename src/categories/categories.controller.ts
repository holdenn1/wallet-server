import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { AccessTokenGuard } from 'src/auth/guards/accessToken.guard';


@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  // @Post('create')
  // create(@Body() createCategoryDto: CreateCategoryDto) {
  //   return this.categoriesService.create(createCategoryDto);
  // }
  @UseGuards(AccessTokenGuard)
  @Get('get-categories')
  getCategories() {
    return this.categoriesService.findAllCategoriesWithThemSubcategories();
  }
}
