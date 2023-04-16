import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthGuard } from '../auth/auth.guard';
import { CurrentUserId } from './decorators/user.decorator';
import { CreateUserInput, GetAccessTokenInput } from './dto/user.input';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly userRepository: UserRepository,
  ) {}

  @Query(() => Boolean)
  async isUsableLoginIdentifier(
    @Args('loginIdentifier', {
      type: () => String,
      description: '사용자가 입력한 로그인 아이디',
    })
    loginIdentifier: string,
  ): Promise<boolean> {
    return this.userService.isUsableLoginIdentifier(loginIdentifier);
  }

  @Mutation(() => User)
  async registerUser(
    @Args('data', {
      type: () => CreateUserInput,
      description: '사용자가 입력한 회원가입 정보',
    })
    createUserInput: CreateUserInput,
  ): Promise<User> {
    return this.userService.registerUser(createUserInput);
  }

  @Mutation(() => String)
  async getAccessToken(
    @Args('data', {
      type: () => GetAccessTokenInput,
      description: '사용자가 입력한 로그인 정보',
    })
    loginUserInput: GetAccessTokenInput,
  ): Promise<string> {
    return this.userService.getAccessToken(loginUserInput);
  }

  @Mutation(() => Boolean, { nullable: true })
  @UseGuards(AuthGuard)
  changeNickname(
    @Args('nickname', {
      type: () => String,
      description: '사용자가 입력한 새로운 닉네임',
    })
    nickname: string,

    @CurrentUserId()
    userId: number,
  ): Promise<void> {
    return this.userRepository.changeNickname({
      userId,
      nickname,
    });
  }
}
