import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  UploadedFile,
  Param,
} from '@nestjs/common';
import { AppService } from './app.service';
import { OssService } from './oss/oss.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { OssConfig } from './config';

import pexels from './data/pexels';
@Controller('api/')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly ossService: OssService,
  ) {}

  /**
   * 获取类目
   * @returns 返回类目结果
   */
  @Get('get/grade')
  async getGrade() {
    return {
      success: true,
      message: 'OK',
      data: [
        { grade: '2008' },
        { grade: '2009' },
        { grade: '2010' },
        { grade: '2011' },
        { grade: '2012' },
        { grade: '2013' },
        { grade: '2014' },
        { grade: '2015' },
        { grade: '2016' },
        { grade: '2017' },
      ],
    };
  }

  /**
   * 根据选择类目返回列表
   * @returns 返回图片列表
   */
  @Get('get/list')
  async getPexels() {
    const result = pexels;
    const randomNumber = function () {
      return 0.5 - Math.random();
    };
    return {
      success: true,
      message: 'OK',
      data: result.sort(randomNumber).slice(0, 20),
    };
  }

  @Get('get/info/:id')
  async getPexelsFromId(@Param('id') id: string | number) {
    return {
      success: true,
      message: 'OK',
      data: pexels.find((item) => item.id === id),
    };
  }

  @Post('set/upload-image')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const res = await this.ossService.putOssFile(
      `${OssConfig.url}${file.originalname}`,
      file.path,
    );

    return { res: res };
  }
}
