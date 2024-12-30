import { ITask } from 'src/features/task';

export interface IGetTaskResponse extends Omit<ITask, 'active'> {}
