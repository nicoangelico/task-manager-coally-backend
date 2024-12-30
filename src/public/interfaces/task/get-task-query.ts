import { ITask } from 'src/features/task';

export interface IGetAllTaskQuery {
  isCompleted?: boolean;
  orderBy?: keyof ITask;
  order?: string;
  page?: number;
  take?: number;
  skip: any;
}

export interface IGetAllTaskFilter {
  _userId: string;
  isCompleted?: boolean;
  active: boolean;
}
