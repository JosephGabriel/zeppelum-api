import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { EventService } from './event.service';
import { EventResolver } from './event.resolver';

import { Event } from './entities/event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Event])],
  providers: [EventResolver, EventService],
})
export class EventModule {}
