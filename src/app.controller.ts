import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
} from '@nestjs/common';
import { AppService } from './app.service';
import { OssService } from './oss/oss.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { OssConfig } from './config';

@Controller('api/')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly ossService: OssService,
  ) {}

  @Post('set/upload-image')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body('urlname') urlname: string,
  ) {
    try {
      const res = await this.ossService.putOssFile(
        `${OssConfig.url}${urlname}/${file.originalname}`,
        file.path,
      );

      return {
        success: true,
        message: 'OK',
        data: res.url,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Error',
      };
    }
  }
}
