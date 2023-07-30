import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { CreateEventInput } from './dto/create-event.input';
import { UpdateEventInput } from './dto/update-event.input';

import { Event } from './entities/event.entity';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
  ) {}

  async createEvent(data: CreateEventInput): Promise<Event> {
    const event = this.eventRepository.create(data);

    return await this.eventRepository.save(event);
  }

  async findAllEvents(): Promise<Event[]> {
    return await this.eventRepository.find();
  }

  async findOneEventById(id: string): Promise<Event> {
    const user = await this.eventRepository.findOneBy({
      id,
    });

    if (!user) {
      throw new NotFoundException('Event not found');
    }

    return user;
  }

  async updateEventById(id: string, data: UpdateEventInput): Promise<Event> {
    const event = await this.findOneEventById(id);

    await this.eventRepository.update(event, data);

    return Object.assign(event, data);
  }

  async removeEventById(id: string): Promise<boolean> {
    const event = await this.findOneEventById(id);

    const deletedEvent = await this.eventRepository.remove(event);

    if (!deletedEvent) {
      throw new InternalServerErrorException();
    }

    return true;
  }
}
