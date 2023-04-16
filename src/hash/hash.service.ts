import { Injectable } from '@nestjs/common';
import { hash, compare } from 'bcrypt';
import { config } from '../lib/config';

@Injectable()
export class HashService {
  readonly ROUNDS = config.hash.rounds;

  async generate(string: string): Promise<string> {
    return hash(string, this.ROUNDS);
  }

  async compare({
    input,
    hash,
  }: {
    input: string;
    hash: string;
  }): Promise<boolean> {
    return compare(input, hash);
  }
}
