
import { Test, TestingModule } from '@nestjs/testing';
import { ClientsService } from './clients.service';
import { Repository } from 'typeorm';
import { Client } from './entities/client.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('ClientsService', () => {
  let service: ClientsService;
  let repo: Repository<Client>;

  const mockClient = { id: '1', name: 'John', deleted: false, viewCount: 0, createdAt: new Date() } as Client;

  const mockRepo = {
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest.fn().mockResolvedValue(mockClient),
    find: jest.fn().mockResolvedValue([mockClient]),
    findOne: jest.fn().mockResolvedValue(mockClient),
    update: jest.fn().mockResolvedValue({}),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientsService,
        { provide: getRepositoryToken(Client), useValue: mockRepo },
      ],
    }).compile();

    service = module.get<ClientsService>(ClientsService);
    repo = module.get<Repository<Client>>(getRepositoryToken(Client));
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a client', async () => {
    const dto = { name: 'Test Client' };
    const result = await service.create(dto);
    expect(repo.create).toHaveBeenCalledWith(dto);
    expect(repo.save).toHaveBeenCalled();
    expect(result).toEqual(mockClient);
  });

  it('should find all non-deleted clients', async () => {
    const result = await service.findAll();
    expect(repo.find).toHaveBeenCalledWith({
      where: { deleted: false },
      order: { createdAt: 'DESC' },
    });
    expect(result).toEqual([mockClient]);
  });

  it('should find one client by id', async () => {
    const result = await service.findOne('1');
    expect(repo.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
    expect(result).toEqual(mockClient);
  });

  it('should update a client and return updated one', async () => {
    const dto = { name: 'Updated' };
    jest.spyOn(service, 'findOne').mockResolvedValueOnce(mockClient);
    const result = await service.update('1', dto);
    expect(repo.update).toHaveBeenCalledWith('1', dto);
    expect(result).toEqual(mockClient);
  });

  it('should soft delete a client', async () => {
    const result = await service.softDelete('1');
    expect(repo.update).toHaveBeenCalledWith('1', { deleted: true });
    expect(result).toEqual({ id: '1' });
  });

  it('should increment view count of existing client', async () => {
    jest.spyOn(service, 'findOne').mockResolvedValueOnce({ ...mockClient, viewCount: 3 });
    const result = await service.incrementView('1');
    expect(repo.save).toHaveBeenCalled();
    expect(result).toBe(4);
  });

  it('should return null if client not found when incrementing view', async () => {
    jest.spyOn(service, 'findOne').mockResolvedValueOnce(null);
    const result = await service.incrementView('999');
    expect(result).toBeNull();
  });
});
