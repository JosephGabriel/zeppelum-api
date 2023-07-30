import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';

import { EventService } from './event.service';
import { Event } from './entities/event.entity';

import { CreateEventInput } from './dto/create-event.input';
import { UpdateEventInput } from './dto/update-event.input';

@Resolver(() => Event)
export class EventResolver {
  constructor(private eventService: EventService) {}

  @Mutation(() => Event)
  createEvent(@Args('data') data: CreateEventInput) {
    return this.eventService.create(data);
  }

  @Query(() => [Event])
  events() {
    return this.eventService.findAll();
  }

  @Query(() => Event)
  event(@Args('id', { type: () => ID }) id: string) {
    return this.eventService.findOne(id);
  }

  @Mutation(() => Event)
  updateEvent(
    @Args('id', { type: () => ID }) id: string,
    @Args('data') data: UpdateEventInput,
  ) {
    return this.eventService.update(id, data);
  }

  @Mutation(() => Boolean)
  removeEvent(@Args('id', { type: () => ID }) id: string) {
    return this.eventService.remove(id);
  }
}
