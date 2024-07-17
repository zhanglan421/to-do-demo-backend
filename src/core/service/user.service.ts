import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '../entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,


  ) {}

  async create() {
    const user: User = new User();

    user.userName = '张三'+Math.random().toFixed(2);

    // const saved = await this.userRepository.save(user);

    // console.log(saved)
  }
}
