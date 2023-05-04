import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { AppService } from './app.service';
import { OssService } from './oss/oss.service';
import { FileInterceptor } from '@nestjs/platform-express';
import ossConfig from './config';
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly ossService: OssService,
  ) {}

  @Get()
  async getHello() {
    return this.appService.getHello();
  }

  @Post('api/set/upload-image')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const res = await this.ossService.putOssFile(
      `${ossConfig.url}${file.originalname}`,
      file.path,
    );

    return { res: res.url };
  }
}
