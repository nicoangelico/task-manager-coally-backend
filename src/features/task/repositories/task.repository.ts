import { Injectable } from '@nestjs/common';
import {
  ClientSession,
  Model,
  SortOrder,
  UpdateQuery,
  UpdateResult,
} from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Task, ITask, ICreateTask } from '../models';
import { IGetAllTaskFilter, IGetAllTaskQuery } from 'src/public';

const descSort: SortOrder = -1;
const ascSort: SortOrder = 1;

@Injectable()
export class TaskRepository<ITask> {
  constructor(
    @InjectModel(Task.name)
    protected readonly task: Model<ITask>,
  ) {}

  async findOne(
    _userId: string,
    _id: string,
    session?: ClientSession,
  ): Promise<Task | null> {
    return await this.task.findOne({ _id, _userId, active: true }, null, { session });
  }

  async create(entity: ICreateTask, session?: ClientSession): Promise<void> {
    await this.task.create([entity], { session });
  }

  public getAll(
    filter?: IGetAllTaskQuery,
    session?: ClientSession,
  ): Promise<Task[] | any> {
    //TODO Remove any
    return this.task.find(filter, null, { session }).lean();
  }

  public async updateOne(
    _userId: string,
    _id: string,
    update: UpdateQuery<ITask>,
    session?: ClientSession,
  ): Promise<UpdateResult> {
    return this.task
      .updateOne({ _id, _userId, active: true }, update, { session })
      .lean();
  }

  public count(filter?: IGetAllTaskFilter): Promise<number> {
    return this.task.countDocuments(filter).lean();
  }

  public async getPaginated(
    paginated: IGetAllTaskQuery,
    filter: IGetAllTaskFilter,
    session?: ClientSession,
  ): Promise<Task[] | any> {
    const { skip, take, orderBy, order } = paginated;

    const defaultUniqueOrder = { _id: descSort };
    const orderByKey = orderBy ? String(orderBy) : 'createdAt';
    const sortOrderKey =
      order === 'ASC' ? ascSort : order === 'DESC' ? descSort : descSort;
    const sortCriteria = { [orderByKey]: sortOrderKey };

    return this.task
      .find(filter, null, { session })
      .skip(skip)
      .limit(take)
      .sort({
        ...sortCriteria,
        ...defaultUniqueOrder,
      })
      .lean();
  }
}
