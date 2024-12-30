import { IGetTaskResponse, TASK_PRIORITY } from 'src/public';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';

export class GetTaskResponseDto implements IGetTaskResponse {
  @ApiProperty({ example: 'task-id' })
  @IsString()
  _id: string;

  @ApiProperty({ example: 'user-id' })
  @IsString()
  _userId: string;

  @ApiProperty({ example: 'Task title' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'Task description' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: TASK_PRIORITY.MEDIUM })
  @IsEnum(TASK_PRIORITY)
  priority: TASK_PRIORITY;

  @ApiProperty({ example: false })
  @IsBoolean()
  isCompleted: boolean;

  @ApiProperty({ example: '2024-12-18T00:00:00.000Z' })
  @IsString()
  createdAt: string;
}
