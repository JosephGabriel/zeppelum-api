import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Provider } from '@nestjs/common';
import { ID } from '@nestjs/graphql';

import { EventResolver } from './event.resolver';
import { EventService } from './event.service';

import {
  TestUtils,
  eventMockRepository,
  returningEvents,
  returningBoolean,
  returningId,
  returningEventStatus,
  returningEventType,
} from './event.utils';

import { Event, EventStatus, EventType } from './entities/event.entity';

describe('EventResolver', () => {
  let resolver: EventResolver;
  const TypeormRepository: Provider = {
    provide: getRepositoryToken(Event),
    useValue: eventMockRepository,
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventResolver, EventService, TypeormRepository],
    }).compile();

    resolver = module.get<EventResolver>(EventResolver);
  });

  beforeEach(() => {
    Object.keys(eventMockRepository).map((key) => {
      eventMockRepository[key as keyof typeof eventMockRepository].mockReset();
    });
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('Mutations', () => {
    describe('createEvent', () => {
      it('should create an event', async () => {
        const mockedEvent = TestUtils.getValidEvent();

        eventMockRepository.create.mockResolvedValue(mockedEvent);
        eventMockRepository.save.mockResolvedValue(mockedEvent);

        const createdEvent = await resolver.createEvent(TestUtils.input);

        expect(createdEvent.title).toBe(TestUtils.input.title);
      });
    });

    describe('updateEvent', () => {
      it('should update an event', async () => {
        const mockedEvent = TestUtils.getValidEvent();
        const mockedInput = TestUtils.input;

        eventMockRepository.findOneBy.mockResolvedValue(mockedEvent);
        eventMockRepository.create.mockResolvedValue(mockedEvent);
        eventMockRepository.update.mockResolvedValue(mockedEvent);

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

        eventMockRepository.findOneBy.mockResolvedValue(mockedEvent);
        eventMockRepository.remove.mockResolvedValue(mockedEvent);

        const removedEvent = await resolver.removeEvent(mockedEvent.id);

        expect(removedEvent).toBe(true);
      });
    });
  });

  describe('Queries', () => {
    describe('events', () => {
      it('should query for events', async () => {
        const mockedEvent = TestUtils.getValidEvent();

        eventMockRepository.find.mockResolvedValue([mockedEvent]);

        const events = await resolver.events();

        expect(events).toHaveLength(1);
      });
    });

    describe('event', () => {
      it('should query for an event by id', async () => {
        const mockedEvent = TestUtils.getValidEvent();

        eventMockRepository.findOneBy.mockResolvedValue(mockedEvent);

        const event = await resolver.event(mockedEvent.id);

        expect(event.id).toBe(mockedEvent.id);
      });

      it('should return an exception when does not find by id', async () => {
        const mockedEvent = TestUtils.getValidEvent();

        eventMockRepository.findOneBy.mockResolvedValue(null);

        try {
          await resolver.event(mockedEvent.id);
        } catch (error) {
          expect(error.message).toBe('Event not found');
        }
      });
    });
  });

  describe('Types', () => {
    it('should be correct types', () => {
      expect(returningEvents()).toBeInstanceOf(Array);
      expect(returningBoolean()).toBe(Boolean);
      expect(returningId()).toBe(ID);
      expect(returningEventType()).toBe(EventType);
      expect(returningEventStatus()).toBe(EventStatus);
    });
  });
});
