import { Test, TestingModule } from '@nestjs/testing';
import { UsersResolver } from './users.resolver';

import { UsersService } from './users.service';

jest.mock('./users.service');

const UsersServiceMock = UsersService as jest.Mock<UsersService>;

describe('UsersResolver', () => {
  let resolver: UsersResolver;
  const usersServiceMock = new UsersServiceMock() as jest.Mocked<UsersService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersResolver,
        {
          provide: UsersService,
          useValue: usersServiceMock,
        },
      ],
    }).compile();

    resolver = module.get<UsersResolver>(UsersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
