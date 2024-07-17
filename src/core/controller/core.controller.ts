import { Body, Controller, Post } from '@nestjs/common';

import { UserService } from '../service/user.service';

import { CreateUserDto } from '../dto/createUser.dto';

@Controller('core')
export class CoreController {
    constructor(private userService: UserService) {}

    @Post('createUser')
    createUser(@Body() userInfo: CreateUserDto) {
        return this.userService.create();
    }
}
