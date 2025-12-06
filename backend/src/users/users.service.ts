import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { IUsersRepository } from './repositories/users.repository.interface';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject('IUsersRepository')
    private readonly usersRepository: IUsersRepository,
  ) {}

  async create(createUserDto: CreateUserDto) {
    // 1 - Verifica se já existe o  email no DB

    const existingEmail = await this.usersRepository.findByEmail(
      createUserDto.email,
    );
    if (existingEmail) {
      throw new ConflictException('Este e-mail ja está em uso');
    }
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(createUserDto.password, salt);

    return await this.usersRepository.create({
      ...createUserDto,
      password: passwordHash,
    });
  }

  async findAll(): Promise<User[] | null> {
    return await this.usersRepository.findAll();
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.usersRepository.findByEmail(email);
  }

  async findOne(id: string): Promise<User | null> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new NotFoundException(`Usuuário cnão encontrado`);
    }

    return user;
  }

  // -------------------------
  // UPDATE GENERICO
  //---------------------------
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User | null> {
    delete (updateUserDto as any).password;
    delete (updateUserDto as any).email;
    await this.findOne(id);

    const updatedUser = await this.usersRepository.update(id, updateUserDto);
    if (!updatedUser) {
      throw new NotFoundException('Erro ao atualizar usuário.');
    }
    return updatedUser;
  }

  async delete(id: string): Promise<void> {
    await this.findOne(id);
    return await this.usersRepository.delete(id);
  }

  //--------------------------------------
  // ATUALIZAR SOMENTE SENHA
  //--------------------------------------
  async updatePassword(id: string, newPassword: string): Promise<void> {
    // 1 - Verifica se o suario existe
    await this.findOne(id);

    // 2 - Criptografa nova senha
    const salt = await bcrypt.genSalt();

    const passwordHash = await bcrypt.hash(newPassword, salt);

    // 3 - Salva somente a senha

    await await this.usersRepository.update(id, { password: passwordHash });
  }

  //--------------------------------------
  // ATUALIZAR SOMENTE EMAIL
  //--------------------------------------

  async updateEmail(id: string, newEmail: string): Promise<User> {
    // 1 -Busca o usuário atual para saber qual é o email velho
    const currentUser = await this.findOne(id);

    // 2 - O email novo não pode ser igual ao atual
    if (currentUser?.email === newEmail) {
      throw new BadRequestException(
        'O novo e-mail deve ser diferente do atual.',
      );
    }

    // 3 - O email deve ser único
    const emailAreUsing = await this.findByEmail(newEmail);
    if (emailAreUsing) {
      throw new ConflictException('Este e-mail já está em uso.');
    }

    // 4 - Se passar do 2 e 3 faz a troca

    const updatedUser = await this.usersRepository.update(id, {
      email: newEmail,
    });

    if (!updatedUser) {
      throw new NotFoundException('Erro ao atualizar e-mail.');
    }
    return updatedUser;
  }
}
