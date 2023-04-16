import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String, {
    description: '사용자의 닉네임, 중복 가능, NULL 이면 자동 생성됨.',
    nullable: true,
  })
  nickname?: string | null;

  @Field(() => String, {
    description: '사용자의 로그인 아이디, 중복 불가능.',
  })
  loginIdentifier!: string;

  @Field(() => String, {
    description: '사용자의 로그인 비밀번호, 암호화되어 저장됨.',
  })
  password!: string;
}

@InputType()
export class GetAccessTokenInput {
  @Field(() => String, {
    description: '사용자의 로그인 아이디.',
  })
  loginIdentifier!: string;

  @Field(() => String, {
    description: '사용자의 로그인 비밀번호.',
  })
  password!: string;
}
