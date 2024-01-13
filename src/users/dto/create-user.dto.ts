import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString, MinLength, MaxLength } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  name: string;

  @Field()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  lastName: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  @MaxLength(20)
  password: string;

  @Field()
  @IsString()
  @MaxLength(20)
  passwordConfirm: string;
}
