import { ObjectType, Field, registerEnumType } from '@nestjs/graphql';

import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import {
  returningEventStatus,
  returningEventType,
  returningId,
} from '../event.utils';

export enum EventType {
  ONLINE = 'ONLINE',
  PRESENTIAL = 'PRESENTIAL',
}

export enum EventStatus {
  COMING_SOON = 'COMING_SOON',
  ON_GOING = 'ON_GOING',
  CONCLUDED = 'CONCLUDED',
}

registerEnumType(EventType, {
  name: 'EventType',
});

registerEnumType(EventStatus, {
  name: 'EventStatus',
});

@ObjectType()
@Entity()
export class Event {
  @Field(returningId)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  image: string;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  price: number;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column()
  dateStart: Date;

  @Field()
  @Column()
  dateEnd: Date;

  @Field(returningEventType)
  @Column({
    default: EventType.ONLINE,
  })
  type: EventType;

  @Field(returningEventStatus)
  @Column({
    default: EventStatus.COMING_SOON,
  })
  status: EventStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
