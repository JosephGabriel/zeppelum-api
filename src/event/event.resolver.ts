import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { EventService } from './event.service';

import { Event } from './entities/event.entity';

import {
  returningEvent,
  returningId,
  returningEvents,
  returningBoolean,
} from './event.utils';

import { CreateEventInput } from './dto/create-event.input';
import { UpdateEventInput } from './dto/update-event.input';
import { FilterOptions } from './dto/filter-options.input';

@Resolver(returningEvent)
export class EventResolver {
  constructor(private eventService: EventService) {}

  @Mutation(returningEvent)
  createEvent(@Args('data') data: CreateEventInput): Promise<Event> {
    return this.eventService.createEvent(data);
  }

  @Query(returningEvents)
  events(
    @Args('filter', { nullable: true }) filter?: FilterOptions,
  ): Promise<Event[]> {
    return this.eventService.findAllEvents(filter);
  }

  @Query(returningEvent)
  event(@Args('id', { type: returningId }) id: string): Promise<Event> {
    return this.eventService.findOneEventById(id);
  }

  @Mutation(returningEvent)
  updateEvent(
    @Args('id', { type: returningId }) id: string,
    @Args('data') data: UpdateEventInput,
  ): Promise<Event> {
    return this.eventService.updateEventById(id, data);
  }

  @Mutation(returningBoolean)
  removeEvent(@Args('id', { type: returningId }) id: string): Promise<boolean> {
    return this.eventService.removeEventById(id);
  }
}
