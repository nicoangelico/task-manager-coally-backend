import { Injectable } from '@nestjs/common';
import { TaskRepository } from '../repositories';
import { IGetAllTaskFilter, IGetAllTaskQuery, PageDto, PageMetaDto, PageMetaDtoParameters } from 'src/public';
import { ITask, Task } from '../models';

const defaultOptions = { order: ['createdAt', 'DESC'], offset: 0, limit: 15 };

@Injectable()
export class GetTaskService {
  constructor(private readonly taskRepository: TaskRepository<ITask>) {}

  async getAllPaginated(
    userId: string,
    query: IGetAllTaskQuery,
  ): Promise<PageDto<Task>> {
    const filter: IGetAllTaskFilter = {
      _userId: userId,
      active: true,
    };

    if (typeof query.isCompleted === 'boolean') {
      filter.isCompleted = query.isCompleted;
    }
    if (typeof query.isCompleted === 'string') {
      filter.isCompleted = query.isCompleted === 'true';
    }

    const pageOptionsDto = {
      skip: query.skip || 0,
      take: query.take ?? defaultOptions.limit,
    };

    const tasks = await this.taskRepository.getPaginated(
      {
        ...pageOptionsDto,
        orderBy: query.orderBy,
        order: query.order,
      },
      filter
    );

    const countTasks = await this.taskRepository.count(
      filter
    );

    const pageMetaDto = new PageMetaDto({ itemCount: countTasks, pageOptionsDto });

    return new PageDto(tasks, pageMetaDto);
  }

  async getById(userId: string, taskId: string): Promise<Task> {
    return await this.taskRepository.findOne(userId, taskId);
  }
}
