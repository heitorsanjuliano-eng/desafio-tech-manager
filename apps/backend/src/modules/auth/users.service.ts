
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}
  async create(email: string, password: string) {
    const hash = await bcrypt.hash(password, 10);
    const u = this.repo.create({ email, password: hash });
    return this.repo.save(u);
  }
  findByEmail(email: string) { return this.repo.findOne({ where: { email } }); }
  findById(id: string) { return this.repo.findOne({ where: { id } }); }
  comparePassword(candidate: string, hash: string) { return bcrypt.compare(candidate, hash); }
}
