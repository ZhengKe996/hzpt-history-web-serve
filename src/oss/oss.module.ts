import { Module } from '@nestjs/common';
import { OssService } from './oss.service';

@Module({
  controllers: [],
  providers: [OssService],
  exports: [OssService],
})
export class OssModule {}
