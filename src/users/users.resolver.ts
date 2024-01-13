import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { User } from './entities/user.entity';

import { CreateUserInput } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Resolver()
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Mutation(() => User)
  createUser(@Args('data') data: CreateUserInput) {
    return this.usersService.create(data);
  }
}
