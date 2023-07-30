import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import {
  InternalServerErrorException,
  NotFoundException,
  Provider,
} from '@nestjs/common';

import { Event, EventStatus, EventType } from './entities/event.entity';

import { EventService } from './event.service';

import { TestUtils } from './event.utils';

describe('EventService', () => {
  let service: EventService;

  const eventMockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOneBy: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeAll(async () => {
    const TypeormRepository: Provider = {
      provide: getRepositoryToken(Event),
      useValue: eventMockRepository,
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [EventService, TypeormRepository],
    }).compile();

    service = module.get<EventService>(EventService);
  });

  beforeEach(() => {
    Object.keys(eventMockRepository).map((key) => {
      eventMockRepository[key as keyof typeof eventMockRepository].mockReset();
    });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('When findAllEvents', () => {
    it('should find all events', async () => {
      const mockedEvent = TestUtils.getValidEvent();

      eventMockRepository.find.mockReturnValue([mockedEvent, mockedEvent]);

      const returnedEvent = await service.findAllEvents();

      expect(returnedEvent).toHaveLength(2);
      expect(eventMockRepository.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('When findOneEventById', () => {
    it('should find event by id', async () => {
      const mockedEvent = TestUtils.getValidEvent();

      eventMockRepository.findOneBy.mockReturnValue(mockedEvent);

      const returnedEvent = await service.findOneEventById(mockedEvent.id);

      expect(returnedEvent.title).toBe(mockedEvent.title);
      expect(eventMockRepository.findOneBy).toHaveBeenCalledTimes(1);
    });

    it('should return an exeption when does not find the event', async () => {
      const mockedEvent = TestUtils.getValidEvent();

      eventMockRepository.findOneBy.mockReturnValue(null);

      try {
        await service.findOneEventById(mockedEvent.title);
      } catch (error) {
        expect(error.message).toBe('Event not found');
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('When createEvent', () => {
    it('should create an event', async () => {
      const mockedEvent = TestUtils.getValidEvent();

      eventMockRepository.create.mockReturnValue(mockedEvent);
      eventMockRepository.save.mockReturnValue(mockedEvent);

      const returnedEvent = await service.createEvent(mockedEvent);

      expect(returnedEvent.title).toBe(mockedEvent.title);
      expect(returnedEvent.type).toBe(EventType.ONLINE);
      expect(returnedEvent.status).toBe(EventStatus.COMING_SOON);
      expect(eventMockRepository.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('When updateEventById', () => {
    it('should update event by id', async () => {
      const mockedEvent = TestUtils.getValidEvent();

      eventMockRepository.findOneBy.mockReturnValue(mockedEvent);

      const returnedEvent = await service.updateEventById(
        mockedEvent.id,
        mockedEvent,
      );

      expect(returnedEvent.title).toBe(mockedEvent.title);
      expect(eventMockRepository.findOneBy).toHaveBeenCalledTimes(1);
      expect(eventMockRepository.update).toHaveBeenCalledTimes(1);
    });

    it('should return an exeption when does not find the event to update', async () => {
      const mockedEvent = TestUtils.getValidEvent();

      eventMockRepository.findOneBy.mockReturnValue(null);

      try {
        await service.findOneEventById(mockedEvent.title);
      } catch (error) {
        expect(error.message).toBe('Event not found');
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('When removeEventById', () => {
    it('should remove event by id', async () => {
      const mockedEvent = TestUtils.getValidEvent();

      eventMockRepository.findOneBy.mockReturnValue(mockedEvent);
      eventMockRepository.remove.mockReturnValue(mockedEvent);

      const returnedEvent = await service.removeEventById(mockedEvent.id);

      expect(returnedEvent).toBe(true);
      expect(eventMockRepository.findOneBy).toHaveBeenCalledTimes(1);
      expect(eventMockRepository.remove).toHaveBeenCalledTimes(1);
    });

    it('should return an exeption when does not find the event to remove', async () => {
      const mockedEvent = TestUtils.getValidEvent();

      eventMockRepository.findOneBy.mockReturnValue(null);

      try {
        await service.removeEventById(mockedEvent.id);
      } catch (error) {
        expect(error.message).toBe('Event not found');
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });

    it('should return an exeption when can not remove the event', async () => {
      const mockedEvent = TestUtils.getValidEvent();

      eventMockRepository.findOneBy.mockReturnValue(mockedEvent);
      eventMockRepository.remove.mockReturnValue(null);

      try {
        await service.removeEventById(mockedEvent.id);
      } catch (error) {
        expect(error).toBeInstanceOf(InternalServerErrorException);
      }
    });
  });
});
