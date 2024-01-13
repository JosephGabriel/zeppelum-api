import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Provider } from '@nestjs/common';

import { UsersService } from './users.service';

import { User } from './entities/user.entity';

describe('UsersService', () => {
  let service: UsersService;

  const userRepo = {
    find: () => jest.fn(),
  };

  const TypeormRepo: Provider = {
    provide: getRepositoryToken(User),
    useValue: userRepo,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, TypeormRepo],
    }).compile();

    service = module.get<UsersService>(UsersService);

    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an user', async () => {
    const user = await service.create({});
  });
});
