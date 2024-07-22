import { HttpException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '../entity/user.entity';

import { CreateUserDto } from '../dto/createUser.dto';
import { Role, roleEnum } from '../entity/role.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(userInfo: CreateUserDto) {

    const isExistedUser = await this.findUserExists(userInfo.userName);

    if (isExistedUser) { return new HttpException('用户名已经存在', 400)}

    const user: User = new User();

    let roleString = (userInfo.userRoles as any).replace(/'/g, '"');

    const roles = JSON.parse(roleString).map(item => {
      let role: Role = new Role();

      role.roleName = item;

      return role
    })

    userInfo.userRoles = roles;
    
    const savedUser = this.userRepository.merge(user, { ...userInfo });


    // return existedUser;
    // const saved = await this.userRepository.save(savedUser);

    // console.log(saved)
  }

  async findUserExists (userName: string)  {
    return await this.userRepository.existsBy({ userName });
  }
}
