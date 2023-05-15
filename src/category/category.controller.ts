import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('api/get/category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    createCategoryDto.col = 1;
    const res = await this.categoryService.create(createCategoryDto);
    if (res.generatedMaps.length > 0)
      return {
        success: true,
        message: 'OK',
      };
    else {
      return {
        success: false,
        message: 'Error',
      };
    }
  }

  @Post('/all')
  async createAll(@Body() createCategoryDto: CreateCategoryDto[]) {
    try {
      createCategoryDto.forEach(async (item) => {
        item.col = 1;
        const { generatedMaps } = await this.categoryService.create(item);
        if (generatedMaps.length <= 0) {
          new Error();
        }
      });
      return {
        success: true,
        message: 'OK',
      };
    } catch (error) {
      return {
        success: false,
        message: 'Error',
      };
    }
  }

  @Get()
  async findAll() {
    return {
      success: true,
      message: 'OK',
      data: await this.categoryService.findAll(),
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    const category = this.categoryService.findOne(id);
    if (category == null) {
      return { success: false, message: 'Error' };
    }

    const res = await this.categoryService.update(id, updateCategoryDto);
    if (res.affected > 0) {
      return {
        success: true,
        message: 'OK',
      };
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    const category = this.categoryService.findOne(id);
    if (category == null) {
      return { success: false, message: 'Error' };
    }
    const res = await this.categoryService.remove(id);
    if (res.affected > 0) {
      return {
        success: true,
        message: 'OK',
      };
    }
  }
}
