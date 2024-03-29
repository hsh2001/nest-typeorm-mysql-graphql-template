import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  sign(user: User) {
    return this.jwtService.signAsync({
      loginIdentifier: user.loginIdentifier,
      sub: user.id,
    });
  }
}
