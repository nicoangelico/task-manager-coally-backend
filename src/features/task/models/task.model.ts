import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { ITask } from './task.entity';
import { TASK_PRIORITY } from 'src/public';

export type TaskDocument = HydratedDocument<Task>;

@Schema()
export class Task implements ITask {
  @Prop({
    required: true,
    type: MongooseSchema.Types.ObjectId,
    auto: true,
  })
  _id!: string;

  @Prop({
    required: true,
    type: MongooseSchema.Types.ObjectId,
  })
  _userId!: string;

  @Prop({
    required: true,
    type: MongooseSchema.Types.String,
  })
  title!: string;

  @Prop({
    type: MongooseSchema.Types.String,
  })
  description?: string;

  @Prop({
    type: MongooseSchema.Types.String,
    default: TASK_PRIORITY.MEDIUM,
  })
  priority!: TASK_PRIORITY;

  @Prop({
    type: MongooseSchema.Types.Boolean,
    default: false,
  })
  isCompleted!: boolean;

  @Prop({
    type: MongooseSchema.Types.Boolean,
    default: true,
  })
  active!: boolean;

  @Prop({
    type: MongooseSchema.Types.String,
    default: new Date().toISOString(),
  })
  createdAt!: string;
}
const schema = SchemaFactory.createForClass(Task);

export const TaskSchema = { name: Task.name, schema };
