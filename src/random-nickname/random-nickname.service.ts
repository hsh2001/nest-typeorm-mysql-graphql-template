import { Injectable } from '@nestjs/common';

@Injectable()
export class RandomNicknameService {
  // 한글 형용사 목록
  private readonly adjectives = [
    '감사한',
    '감동적인',
    '감탄하는',
    '강한',
    '개성있는',
    '거친',
    '건강한',
    '겁쟁이',
    '격려하는',
    '결심하는',
    '경계하는',
    '고독한',
    '고마운',
  ];

  // 한글 명사 목록
  private readonly nouns = [
    '감자',
    '강아지',
    '거북이',
    '고양이',
    '곰',
    '곰돌이',
    '고래',
    '고릴라',
    '고양이',
  ];

  private pickRandom<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
  }

  pickRandomAdjective(): string {
    return this.pickRandom(this.adjectives);
  }

  pickRandomNoun(): string {
    return this.pickRandom(this.nouns);
  }

  generate() {
    const adjective = this.pickRandomAdjective();
    const noun = this.pickRandomNoun();
    return `${adjective} ${noun}`;
  }
}
