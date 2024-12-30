import { BadRequestException, Injectable } from '@nestjs/common';
import { TaskRepository } from '../repositories';
import { IUpdateTaskBody } from 'src/public';
import { ITask } from '../models';

@Injectable()
export class UpdateTaskService {
  constructor(private readonly taskRepository: TaskRepository<ITask>) {}

  async update(
    userId: string,
    taskId: string,
    update: IUpdateTaskBody,
  ): Promise<void> {
    const task = await this.taskRepository.findOne(userId, taskId);
    if (!task) {
      throw new BadRequestException('Task not found');
    }

    // if (task.isCompleted) {
    //   throw new BadRequestException('Task was completed');
    // }

    await this.taskRepository.updateOne(userId, taskId, update);
  }

  async delete(userId: string, taskId: string): Promise<void> {
    await this.taskRepository.updateOne(userId, taskId, { active: false });
  }
}
