import { Module } from '@nestjs/common';
import { RandomNicknameService } from './random-nickname.service';

@Module({
  providers: [RandomNicknameService],
  exports: [RandomNicknameService],
})
export class RandomNicknameModule {}
