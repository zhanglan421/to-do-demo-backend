import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '../entity/user.entity';

import { CreateUserDto } from '../dto/createUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(userInfo: CreateUserDto) {
    const user: User = new User();

    console.log(user);

    const savedUser = this.userRepository.merge(user, { ...userInfo });

    const existedUser = await this.userRepository.existsBy({
      userName: userInfo.userName,
    });

    console.log(user);

    return savedUser;
    // const saved = await this.userRepository.save(user);

    // console.log(saved)
  }
}
