import { Test, TestingModule } from '@nestjs/testing';
import { HttpException } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { User } from './entities/user.entity';

describe('UsersService', () => {
  let service: UsersService;
  const repo = {
    findAll: jest.fn(),
    findById: jest.fn(),
    findByEmail: jest.fn(),
    createUser: jest.fn(),
    save: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, { provide: UsersRepository, useValue: repo }],
    }).compile();

    service = module.get<UsersService>(UsersService);
    jest.clearAllMocks();
  });

  it('should create a user', async () => {
    const user = { id: '1', email: 'a@test.com' } as User;
    repo.findByEmail.mockResolvedValue(null);
    repo.createUser.mockResolvedValue(user);
    const result = await service.create({ email: user.email, password: 'p' });
    expect(result).toBe(user);
  });

  it('should throw error if email exists', async () => {
    repo.findByEmail.mockResolvedValue({ id: '1' } as User);
    await expect(
      service.create({ email: 'a@test.com', password: 'p' }),
    ).rejects.toBeInstanceOf(HttpException);
  });
});
