import { ID } from '@nestjs/graphql';
import { Event, EventStatus, EventType } from './entities/event.entity';

export class TestUtils {
  static getValidEvent(): Event {
    const event = new Event();

    event.id = '13a4f5fc-c6ce-45ee-b7b2-8b6b7d839e0b';
    event.image = 'https://example.com/image.jpg';
    event.title = 'Meu Evento';
    event.price = 29;
    event.description = 'Descrição do meu evento';
    event.dateStart = '2023-08-01T10:00:00';
    event.dateEnd = '2023-08-01T18:00:00';
    event.type = EventType.ONLINE;
    event.status = EventStatus.COMING_SOON;
    event.createdAt = new Date('2023-07-30T12:21:43.000Z');
    event.updatedAt = new Date('2023-07-30T12:21:43.000Z');

    return event;
  }

  static input = {
    image: 'https://example.com/image.jpg',
    title: 'Meu Evento',
    price: 29,
    description: 'Descrição do meu evento',
    dateStart: '2023-08-01T10:00:00',
    dateEnd: '2023-08-01T18:00:00',
  };
}

export const returningEvent = () => Event;
export const returningEvents = () => [Event];
export const returningBoolean = () => Boolean;
export const returningId = () => ID;
export const returningEventType = () => EventType;
export const returningEventStatus = () => EventStatus;
