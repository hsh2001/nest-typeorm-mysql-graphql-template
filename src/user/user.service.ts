import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { HashService } from '../hash/hash.service';
import { RandomNicknameService } from '../random-nickname/random-nickname.service';
import { CreateUserInput, GetAccessTokenInput } from './dto/user.input';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashService: HashService,
    private readonly randomNicknameService: RandomNicknameService,
    private readonly authService: AuthService,
  ) {}

  async isUsableLoginIdentifier(loginIdentifier: string): Promise<boolean> {
    return (
      (await this.userRepository.countByLoginIdentifier(loginIdentifier)) === 0
    );
  }

  async registerUser({
    loginIdentifier,
    password,
    nickname,
  }: CreateUserInput): Promise<User> {
    const isUsableLoginIdentifier =
      this.isUsableLoginIdentifier(loginIdentifier);

    if (!isUsableLoginIdentifier) {
      throw new Error('이미 사용중인 로그인 아이디입니다.');
    }

    nickname = (
      nickname?.trim() || this.randomNicknameService.generate()
    ).trim();

    const hashedPassword = await this.hashService.generate(password.trim());

    return this.userRepository.create({
      loginIdentifier,
      hashedPassword,
      nickname,
    });
  }

  async getAccessToken({
    loginIdentifier,
    password,
  }: GetAccessTokenInput): Promise<string> {
    const user = await this.userRepository.getByLoginIdentifier(
      loginIdentifier,
    );

    const isPasswordMatched = await this.hashService.compare({
      input: password,
      hash: user.hashedPassword,
    });

    if (!isPasswordMatched) {
      throw new Error('비밀번호가 일치하지 않습니다.');
    }

    return this.authService.sign(user);
  }
}
