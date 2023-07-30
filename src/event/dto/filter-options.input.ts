import { Field, InputType, registerEnumType } from '@nestjs/graphql';

export enum SortBy {
  ASC = 'ASC',
  DESC = 'DESC',
}

registerEnumType(SortBy, {
  name: 'SortBy',
});

@InputType()
export class FilterOptions {
  @Field()
  skip?: number;

  @Field()
  take?: number;

  @Field(() => SortBy)
  sortBy?: SortBy;
}
