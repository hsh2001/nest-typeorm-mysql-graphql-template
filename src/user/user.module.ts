import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { UserRepository } from './user.repository';
import { DatabaseModule } from '../database/database.module';
import { HashModule } from '../hash/hash.module';
import { RandomNicknameModule } from '../random-nickname/random-nickname.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [DatabaseModule, HashModule, RandomNicknameModule, AuthModule],
  providers: [UserService, UserResolver, UserRepository],
  exports: [UserService, UserResolver, UserRepository],
})
export class UserModule {}
