import { Body, Controller, Post, Req, UseInterceptors } from '@nestjs/common';
import { NoFilesInterceptor } from '@nestjs/platform-express';

import { UserService } from '../service/user.service';

import { CreateUserDto } from '../dto/createUser.dto';

@Controller('core')
export class CoreController {
    constructor(private userService: UserService) {}

    @Post('createUser')
    @UseInterceptors(NoFilesInterceptor())
    createUser(@Body() userInfo: CreateUserDto) {
        // console.log('userInfo', userInfo)
        
        return this.userService.create(userInfo);
    }
}
