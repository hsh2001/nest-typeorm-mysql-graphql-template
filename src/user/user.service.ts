import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './user.entity';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly userRepo: Repository<User>;

  getAll() {
    return this.userRepo.find();
  }
}
