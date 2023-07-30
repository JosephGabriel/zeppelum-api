import { InputType, Field, PartialType } from '@nestjs/graphql';

import { EventStatus, EventType } from '../entities/event.entity';

import { CreateEventInput } from './create-event.input';

@InputType()
export class UpdateEventInput extends PartialType(CreateEventInput) {
  @Field(() => EventType)
  type?: EventType;

  @Field(() => EventStatus)
  status?: EventStatus;
}
