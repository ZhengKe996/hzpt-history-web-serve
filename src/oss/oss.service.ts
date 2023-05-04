import { Injectable } from '@nestjs/common';
import * as OSS from 'ali-oss';
import ossConfig from '../config';
@Injectable()
export class OssService {
  private client: any;
  public constructor() {
    this.client = new OSS({
      accessKeyId: ossConfig.accessKeyId,
      accessKeySecret: ossConfig.accessKeySecret,
      region: ossConfig.region,
      bucket: ossConfig.bucket,
    });
  }

  // 上传文件到oss 并返回  图片oss 地址
  public async putOssFile(ossPath: string, localPath: string) {
    let res: any;
    try {
      res = await this.client.put(ossPath, localPath);
      // 将文件设置为公共可读
      await this.client.putACL(ossPath, 'public-read');
      return res;
    } catch (error) {
      return `Service error: ${error}`;
    }
  }
}
