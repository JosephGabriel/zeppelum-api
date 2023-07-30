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

  async create(data: CreateEventInput): Promise<Event> {
    const event = this.eventRepository.create(data);

    return await this.eventRepository.save(event);
  }

  async findAll(): Promise<Event[]> {
    return await this.eventRepository.find();
  }

  async findOne(id: string): Promise<Event> {
    const user = await this.eventRepository.findOneBy({
      id,
    });

    if (!user) {
      throw new NotFoundException('Event not found');
    }

    return user;
  }

  async update(id: string, data: UpdateEventInput): Promise<Event> {
    const event = await this.findOne(id);

    await this.eventRepository.update(event, data);

    return Object.assign(event, data);
  }

  async remove(id: string): Promise<boolean> {
    const event = await this.findOne(id);

    const deletedEvent = await this.eventRepository.remove(event);

    if (!deletedEvent) {
      throw new InternalServerErrorException();
    }

    return true;
  }
}
