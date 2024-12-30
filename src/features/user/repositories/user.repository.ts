import { Injectable } from '@nestjs/common';
import { ClientSession, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, IUser } from '../models';

@Injectable()
export class UserRepository<IUser> {
  constructor(
    @InjectModel(User.name)
    protected readonly user: Model<IUser>,
  ) {}

  async findOne(_id: string, session?: ClientSession): Promise<User | null> {
    return await this.user.findOne({ _id }, null, { session });
  }

  async findByEmail(
    email: string,
    session?: ClientSession,
  ): Promise<User | null> {
    return await this.user.findOne({ email }, null, { session });
  }

  async create(
    entity: Omit<IUser, '_id'>,
    session?: ClientSession,
  ): Promise<void> {
    await this.user.create([entity], { session });
  }
}
