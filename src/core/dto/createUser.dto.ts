import { IsNotEmpty } from "class-validator";

import { Role } from "../entity/role.entity";
import { Type } from "class-transformer";

export class CreateUserDto {
    @IsNotEmpty({ message: '用户名不能为空' })
    userName: string;

    @IsNotEmpty({ message: '密码不能为空' })
    userPassword: string;

    @IsNotEmpty({ message: '权限不能为空' })
    @Type(() => Role)
    userRoles: Role[];
}