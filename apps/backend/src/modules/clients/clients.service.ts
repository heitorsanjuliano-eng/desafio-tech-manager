
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './entities/client.entity';
@Injectable()
export class ClientsService {
  constructor(@InjectRepository(Client) private repo: Repository<Client>) {}
  create(data: Partial<Client>) { return this.repo.save(this.repo.create(data)); }
  findAll() { return this.repo.find({ where: { deleted: false }, order: { createdAt: 'DESC' } }); }
  findOne(id: string) { return this.repo.findOne({ where: { id } }); }
  async update(id: string, data: Partial<Client>) { await this.repo.update(id, data); return this.findOne(id); }
  async softDelete(id: string) { await this.repo.update(id, { deleted: true }); return { id }; }
  async incrementView(id: string) {
    const client = await this.findOne(id);
    if (!client) return null;
    client.viewCount = (client.viewCount || 0) + 1;
    await this.repo.save(client);
    return client.viewCount;
  }
}
