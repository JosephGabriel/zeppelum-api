import { Event, EventStatus, EventType } from './entities/event.entity';

export class TestUtils {
  static getValidEvent(): Event {
    const event = new Event();

    event.id = '13a4f5fc-c6ce-45ee-b7b2-8b6b7d839e0b';
    event.image = 'https://example.com/image.jpg';
    event.title = 'Meu Evento';
    event.price = 29;
    event.description = 'Descrição do meu evento';
    event.dateStart = new Date();
    event.dateEnd = new Date();
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
    dateStart: new Date('2023-08-01T10:00:00'),
    dateEnd: new Date('2023-08-01T18:00:00'),
  };
}
