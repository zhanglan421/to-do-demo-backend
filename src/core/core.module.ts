import { Module } from '@nestjs/common';

import { CoreController } from './controller/core.controller';

@Module({
  controllers: [CoreController]
})
export class CoreModule {}
