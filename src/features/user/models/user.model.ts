import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { IUser } from './user.entity';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User implements IUser {
  @Prop({
    required: true,
    type: MongooseSchema.Types.ObjectId,
    auto: true,
  })
  _id!: string;

  @Prop({
    required: true,
    type: MongooseSchema.Types.String,
  })
  name!: string;

  @Prop({
    required: true,
    type: MongooseSchema.Types.String,
  })
  email!: string;

  @Prop({
    required: true,
    type: MongooseSchema.Types.String,
  })
  password!: string;

  @Prop({
    required: true,
    type: MongooseSchema.Types.Boolean,
  })
  active!: boolean;
}
const schema = SchemaFactory.createForClass(User);

export const UserSchema = { name: User.name, schema };
