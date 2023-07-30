import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Provider } from '@nestjs/common';
import { Repository } from 'typeorm';

import { EventResolver } from './event.resolver';
import { EventService } from './event.service';
import { TestUtils } from './event.utils';

import { Event } from './entities/event.entity';

describe('EventResolver', () => {
  let resolver: EventResolver;
  let repository: Repository<Event>;

  const TypeormRepository: Provider = {
    provide: getRepositoryToken(Event),
    useClass: Repository,
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventResolver, EventService, TypeormRepository],
    }).compile();

    resolver = module.get<EventResolver>(EventResolver);
    repository = module.get<Repository<Event>>(getRepositoryToken(Event));
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('Mutations', () => {
    describe('createEvent', () => {
      it('should create an event', async () => {
        const mockedEvent = TestUtils.getValidEvent();

        repository.create = jest.fn().mockResolvedValue(mockedEvent);
        repository.save = jest.fn().mockResolvedValue(mockedEvent);

        const createdEvent = await resolver.createEvent(TestUtils.input);

        expect(createdEvent.title).toBe(TestUtils.input.title);
      });
    });

    describe('updateEvent', () => {
      it('should update an event', async () => {
        const mockedEvent = TestUtils.getValidEvent();
        const mockedInput = TestUtils.input;

        repository.findOneBy = jest.fn().mockResolvedValue(mockedEvent);
        repository.create = jest.fn().mockResolvedValue(mockedEvent);
        repository.update = jest.fn().mockResolvedValue(mockedEvent);

        const updatedEvent = await resolver.updateEvent(
          mockedEvent.id,
          mockedInput,
        );

        expect(updatedEvent.title).toBe(mockedInput.title);
      });
    });

    describe('removeEvent', () => {
      it('should remove an event', async () => {
        const mockedEvent = TestUtils.getValidEvent();

        repository.findOneBy = jest.fn().mockResolvedValue(mockedEvent);
        repository.remove = jest.fn().mockResolvedValue(mockedEvent);

        const removedEvent = await resolver.removeEvent(mockedEvent.id);

        expect(removedEvent).toBe(true);
      });
    });
  });

  describe('Queries', () => {
    describe('events', () => {
      it('should query for events', async () => {
        const mockedEvent = TestUtils.getValidEvent();

        repository.find = jest.fn().mockResolvedValue([mockedEvent]);

        const events = await resolver.events();

        expect(events).toHaveLength(1);
      });
    });

    describe('event', () => {
      it('should query for an event by id', async () => {
        const mockedEvent = TestUtils.getValidEvent();

        repository.findOneBy = jest.fn().mockResolvedValue(mockedEvent);

        const event = await resolver.event(mockedEvent.id);

        expect(event.id).toBe(mockedEvent.id);
      });

      it('should return an exception when does not find by id', async () => {
        const mockedEvent = TestUtils.getValidEvent();

        repository.findOneBy = jest.fn().mockResolvedValue(null);

        try {
          await resolver.event(mockedEvent.id);
        } catch (error) {
          expect(error.message).toBe('Event not found');
        }
      });
    });
  });
});
