import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';

import { EventService } from './event.service';

import { Event } from './entities/event.entity';

import { CreateEventInput } from './dto/create-event.input';
import { UpdateEventInput } from './dto/update-event.input';
import { FilterOptions } from './dto/filter-options.input';

@Resolver(() => Event)
export class EventResolver {
  constructor(private eventService: EventService) {}

  @Mutation(() => Event)
  createEvent(@Args('data') data: CreateEventInput): Promise<Event> {
    return this.eventService.createEvent(data);
  }

  @Query(() => [Event])
  events(
    @Args('filter', { nullable: true }) filter?: FilterOptions,
  ): Promise<Event[]> {
    return this.eventService.findAllEvents(filter);
  }

  @Query(() => Event)
  event(@Args('id', { type: () => ID }) id: string): Promise<Event> {
    return this.eventService.findOneEventById(id);
  }

  @Mutation(() => Event)
  updateEvent(
    @Args('id', { type: () => ID }) id: string,
    @Args('data') data: UpdateEventInput,
  ): Promise<Event> {
    return this.eventService.updateEventById(id, data);
  }

  @Mutation(() => Boolean)
  removeEvent(@Args('id', { type: () => ID }) id: string): Promise<boolean> {
    return this.eventService.removeEventById(id);
  }
}
