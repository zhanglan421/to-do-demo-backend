import { Module } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';


import { CoreController } from './controller/core.controller';

import { UserService } from './service/user.service';

import { ValidationPipe } from './pipe/validate.pipe';

import { User } from './entity/user.entity';
import { Role } from './entity/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role])],
  controllers: [CoreController],
  providers: [
    UserService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe
    }
  ],
})
export class CoreModule {}
