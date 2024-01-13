import { ObjectType, Field, registerEnumType, ID } from '@nestjs/graphql';

import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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
  @Field(() => ID)
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

  @Field(() => EventType)
  @Column({
    default: EventType.ONLINE,
  })
  type: EventType;

  @Field(() => EventStatus)
  @Column({
    default: EventStatus.COMING_SOON,
  })
  status: EventStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
