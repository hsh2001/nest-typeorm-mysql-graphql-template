import { Query, Resolver } from '@nestjs/graphql';

import { User } from './user.entity';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  async allUsers() {
    return this.userService.getAll();
  }
}
