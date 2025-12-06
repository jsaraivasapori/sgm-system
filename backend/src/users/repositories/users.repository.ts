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
  async findAll(): Promise<User[]> {
    return await this.typeOrm.find();
  }
  async update(id: string, data: Partial<User>): Promise<User | null> {
    // O método update do TypeORM retorna um UpdateResult (linhas afetadas), não o objeto.
    // Por isso, fazemos o update e depois buscamos o objeto atualizado.
    await this.typeOrm.update(id, data);

    return await this.findById(id);
  }
  async delete(id: string): Promise<void> {
    await this.typeOrm.delete(id);
  }

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
