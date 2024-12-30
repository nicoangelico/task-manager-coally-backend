import { TASK_PRIORITY } from 'src/public/constants';

export interface ICreateTaskBody {
  title: string;
  description?: string;
  priority?: TASK_PRIORITY;
}
