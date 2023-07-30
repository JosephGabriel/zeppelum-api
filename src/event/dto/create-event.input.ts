import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateEventInput {
  @Field()
  image: string;

  @Field()
  title: string;

  @Field()
  price: number;

  @Field()
  description: string;

  @Field()
  dateStart: string;

  @Field()
  dateEnd: string;
}
