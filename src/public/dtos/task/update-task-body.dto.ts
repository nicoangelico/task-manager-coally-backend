import { IUpdateTaskBody, TASK_PRIORITY } from 'src/public';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateTaskBodyDto implements IUpdateTaskBody {
  @ApiProperty({ example: 'New task' })
  @IsString()
  @IsOptional()
  @MinLength(5, { message: 'Title must be at least 5 characters long.' })
  @MaxLength(30, { message: 'Title must not exceed 30 characters.' })
  title?: string;

  @ApiProperty({ example: 'Task description' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: TASK_PRIORITY.MEDIUM })
  @IsEnum(TASK_PRIORITY)
  @IsOptional()
  priority?: TASK_PRIORITY;

  @ApiProperty({ example: false })
  @IsBoolean()
  @IsOptional()
  isCompleted?: boolean;
}
