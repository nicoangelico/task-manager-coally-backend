import { TASK_PRIORITY } from 'src/public/constants';

export interface IUpdateTaskBody {
  title?: string;
  description?: string;
  priority?: TASK_PRIORITY;
  isCompleted?: boolean;
}
