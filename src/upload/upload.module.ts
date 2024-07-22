import { Module } from '@nestjs/common';

import { uploadController } from './controller/upload.controller';
import { UploadService } from './service/upload.service';

@Module({
  controllers: [uploadController],
  providers: [UploadService],
})
export class UploadModule {}
