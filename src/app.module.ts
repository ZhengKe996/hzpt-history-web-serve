import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { diskStorage } from 'multer';
import Config from './config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OssModule } from './oss/oss.module';
import { CategoryModule } from './category/category.module';
import * as nuid from 'nuid';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      // 连接数据库
      type: 'mysql',
      host: Config.db.db_host,
      port: Config.db.db_port,
      username: Config.db.db_user,
      password: Config.db.db_password,
      database: Config.db.db_name,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      autoLoadEntities: true, // 自动链接被 forFeature 注册的实体
      synchronize: true, // 实体与表同步 调试模式下开始。不然会有强替换导致数据丢是
    }),

    MulterModule.register({
      // 文件上传
      storage: diskStorage({
        // 配置文件上传后的文件夹路径
        destination: `./public/uploads/`,
        filename: (req, file, cb) => {
          // 在此处自定义保存后的文件名称
          const filename = `${nuid.next()}.${file.mimetype.split('/')[1]}`;
          return cb(null, filename);
        },
      }),
    }),
    OssModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
