import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  CreateTaskService,
  GetTaskService,
  UpdateTaskService,
} from 'src/features/task';
import { JwtAuthGuard } from 'src/features/user';
import {
  CreateTaskBodyDto,
  IGetAllTaskQueryDto,
  RequestExtended,
  UpdateTaskBodyDto,
} from 'src/public';

@ApiBearerAuth()
@ApiTags('Tasks')
@Controller('task')
@UseGuards(JwtAuthGuard)
export class TaskController {
  constructor(
    private readonly createTaskService: CreateTaskService,
    private readonly getTaskService: GetTaskService,
    private readonly updateTaskService: UpdateTaskService,
  ) {}

  @Get('/all')
  async getAllTask(
    @Req() request: RequestExtended,
    @Query() getAllQuotesQuery: IGetAllTaskQueryDto,
  ) {
    return this.getTaskService.getAllPaginated(
      request.user._id,
      getAllQuotesQuery,
    );
  }

  @Get('/:id')
  async getTaskById(
    @Req() request: RequestExtended,
    @Param('id') taskId: string,
  ) {
    return this.getTaskService.getById(request.user._id, taskId);
  }

  @Post()
  async createTask(
    @Req() request: RequestExtended,
    @Body() body: CreateTaskBodyDto
  ) {
    return this.createTaskService.create(request.user._id, body);
  }

  @Put('/:id')
  async updateTask(
    @Req() request: RequestExtended,
    @Param('id') taskId: string,
    @Body() body: UpdateTaskBodyDto,
  ) {
    return this.updateTaskService.update(request.user._id, taskId, body);
  }

  @Delete('/:id')
  async deleteTask(
    @Req() request: RequestExtended,
    @Param('id') taskId: string,
  ) {
    return this.updateTaskService.delete(request.user._id, taskId);
  }
}
