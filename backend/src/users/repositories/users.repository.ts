import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { IUsersRepository } from './users.repository.interface';

@Injectable()
export class UsersRepository implements IUsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly typeOrm: Repository<User>,
  ) {}

  async create(data: Partial<User>): Promise<User> {
    const user = this.typeOrm.create(data);
    return await this.typeOrm.save(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.typeOrm.findOne({ where: { email } });
  }

  async findById(id: string): Promise<User | null> {
    return await this.typeOrm.findOne({ where: { id } });
  }
}
