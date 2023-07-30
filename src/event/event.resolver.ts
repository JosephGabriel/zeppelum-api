import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { EventService } from './event.service';

import {
  returningEvent,
  returningId,
  returningEvents,
  returningBoolean,
} from './event.utils';

import { CreateEventInput } from './dto/create-event.input';
import { UpdateEventInput } from './dto/update-event.input';

@Resolver(returningEvent)
export class EventResolver {
  constructor(private eventService: EventService) {}

  @Mutation(returningEvent)
  createEvent(@Args('data') data: CreateEventInput) {
    return this.eventService.createEvent(data);
  }

  @Query(returningEvents)
  events() {
    return this.eventService.findAllEvents();
  }

  @Query(returningEvent)
  event(@Args('id', { type: returningId }) id: string) {
    return this.eventService.findOneEventById(id);
  }

  @Mutation(returningEvent)
  updateEvent(
    @Args('id', { type: returningId }) id: string,
    @Args('data') data: UpdateEventInput,
  ) {
    return this.eventService.updateEventById(id, data);
  }

  @Mutation(returningBoolean)
  removeEvent(@Args('id', { type: returningId }) id: string) {
    return this.eventService.removeEventById(id);
  }
}
