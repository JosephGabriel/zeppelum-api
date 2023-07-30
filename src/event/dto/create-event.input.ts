import { InputType, Field } from '@nestjs/graphql';
import { MinLength, IsUrl } from 'class-validator';

@InputType()
export class CreateEventInput {
  @Field()
  @IsUrl()
  image: string;

  @Field()
  @MinLength(3)
  title: string;

  @Field()
  price: number;

  @Field()
  @MinLength(20)
  description: string;

  @Field()
  dateStart: string;

  @Field()
  dateEnd: string;
}
