import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../repositories';
import { JwtPayload } from 'src/public';
import { UserJwtService } from './user-jwt.service';
import { IUser } from '../models';

@Injectable()
export class LoginService {
  constructor(
    private readonly userJwtService: UserJwtService,
    private readonly userRepository: UserRepository<IUser>,
  ) {}

  async login(
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundException('User not found or password is incorrect.');
    }

    await this.userJwtService.validatePasswordUser(password, user.password);

    const payload: JwtPayload = {
      _id: user._id,
      email: user.email,
    };

    const access_token = await this.userJwtService.login(payload);

    return {
      access_token,
    };
  }
}
