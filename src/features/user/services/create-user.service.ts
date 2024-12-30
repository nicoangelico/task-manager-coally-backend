import { Injectable, BadRequestException } from '@nestjs/common';
import { UserRepository } from '../repositories';
import { UserJwtService } from './user-jwt.service';
import { ICreateUserBody } from 'src/public';
import { IUser } from '../models';

@Injectable()
export class CreateUserService {
  constructor(
    private readonly userJwtService: UserJwtService,
    private readonly userRepository: UserRepository<IUser>,
  ) {}

  async create(body: ICreateUserBody): Promise<void> {
    const { email, name, password, password_confirmation } = body;

    if (password !== password_confirmation) {
      throw new BadRequestException('Passwords do not match.');
    }

    const pwEncrypted = await this.userJwtService.hashPasword(password);

    const data: Omit<IUser, '_id'> = {
      name,
      email,
      password: pwEncrypted,
      active: true,
    };
    await this.userRepository.create(data);
  }
}
