import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GradeService } from './grade.service';
import { CreateGradeDto } from './dto/create-grade.dto';
import { UpdateGradeDto } from './dto/update-grade.dto';

@Controller('api/get/grade')
export class GradeController {
  constructor(private readonly gradeService: GradeService) {}

  @Post()
  async create(@Body() createGradeDto: CreateGradeDto) {
    const res = await this.gradeService.create(createGradeDto);
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
  async createAll(@Body() createGradeDto: CreateGradeDto[]) {
    try {
      createGradeDto.forEach(async (item) => {
        const { generatedMaps } = await this.gradeService.create(item);
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
      data: await this.gradeService.findAll(),
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateGradeDto: UpdateGradeDto,
  ) {
    const grade = await this.gradeService.findOne(id);
    if (grade == null || grade.length <= 0) {
      return { success: false, message: 'Error' };
    }
    const res = await this.gradeService.update(id, updateGradeDto);
    if (res.affected > 0) {
      return {
        success: true,
        message: 'OK',
      };
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    const grade = await this.gradeService.findOne(id);
    if (grade == null || grade.length <= 0) {
      return { success: false, message: 'Error' };
    }
    const res = await this.gradeService.remove(id);
    if (res.affected > 0) {
      return {
        success: true,
        message: 'OK',
      };
    }
  }
}
