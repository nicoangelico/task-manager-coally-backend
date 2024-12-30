import { JwtPayload } from 'src/public';
import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService as NestJwtSerevice } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserJwtService {
  constructor(
    private readonly nestJwtService: NestJwtSerevice,
    private readonly configService: ConfigService,
  ) {}

  async validatePasswordUser(
    password: string,
    userPassword: string,
  ): Promise<void> {
    const isMatch = await bcrypt.compare(password, userPassword);

    if (!isMatch) {
      throw new NotFoundException('User not found or password is incorrect.');
    }
  }

  async login(payload: JwtPayload): Promise<string> {
    const secret = this.configService.get('user.secret');
    return await this.nestJwtService.signAsync(payload, { secret });
  }

  async recoveryToken(email: string): Promise<string> {
    const secret = this.configService.get('user.secret');
    return await this.nestJwtService.signAsync(email, { secret });
  }

  async hashPasword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }
}
