import { Test, TestingModule } from '@nestjs/testing';
import { mockTypeORMConnection } from 'src/test-util/mock-typeorm';

import { UserRepository } from './user.repository';

describe('UserRepository', () => {
  let userRepo: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserRepository, mockTypeORMConnection()],
    }).compile();

    userRepo = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(userRepo).toBeDefined();
  });
});
