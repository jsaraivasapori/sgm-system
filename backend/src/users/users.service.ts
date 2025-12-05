import { Inject, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { IUsersRepository } from './repositories/users.repository.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    // Injetamos a Interface usando o Token que definimos no módulo
    @Inject('IUsersRepository')
    private readonly usersRepository: IUsersRepository,
  ) {}
  async create(createUserDto: any) {
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(createUserDto.password, salt);

    // O Service chama o método do contrato, sem saber que é TypeORM por trás
    return await this.usersRepository.create({
      ...createUserDto,
      password: passwordHash,
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.usersRepository.findByEmail(email);
  }
}
