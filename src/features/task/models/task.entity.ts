import { TASK_PRIORITY } from 'src/public';

export interface ITask {
  _id: string;
  _userId: string;
  title: string;
  description?: string;
  priority: TASK_PRIORITY;
  isCompleted: boolean;
  active: boolean;
  createdAt: string;
}

export interface ICreateTask
  extends Pick<ITask, 'title' | '_userId' | 'description' | 'priority'> {}
