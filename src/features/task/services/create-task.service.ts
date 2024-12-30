import { Injectable } from '@nestjs/common';
import { TaskRepository } from '../repositories';
import { ICreateTaskBody } from 'src/public';
import { ICreateTask, ITask } from '../models';

@Injectable()
export class CreateTaskService {
  constructor(private readonly taskRepository: TaskRepository<ITask>) {}

  async create(userId: string, body: ICreateTaskBody): Promise<void> {
    const { title, description, priority } = body;

    const data: ICreateTask = {
      _userId: userId,
      title,
      description,
      priority,
    };
    await this.taskRepository.create(data);
  }
}
