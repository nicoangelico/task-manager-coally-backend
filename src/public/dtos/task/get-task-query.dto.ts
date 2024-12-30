import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
  Max,
  Min,
} from 'class-validator';
import { ORDER } from '../../constants';
import { IGetAllTaskQuery } from 'src/public/interfaces';
import { ITask } from 'src/features/task';

export class IGetAllTaskQueryDto implements IGetAllTaskQuery {
  @ApiPropertyOptional({
    example: false,
  })
  @IsBoolean()
  @Type(() => Boolean)
  @IsOptional()
  isCompleted?: boolean;

  @ApiPropertyOptional({
    default: 'createdAt',
  })
  @IsOptional()
  orderBy?: keyof ITask;

  @ApiPropertyOptional({ enum: ORDER, default: ORDER.ASC })
  @IsEnum(ORDER)
  @IsOptional()
  readonly order?: ORDER = ORDER.ASC;

  @ApiPropertyOptional({
    minimum: 0,
    default: 0,
  })
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @IsOptional()
  readonly page?: number = 0;

  @ApiPropertyOptional({
    minimum: 1,
    maximum: 50,
    default: 10,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  @IsOptional()
  readonly take?: number = 10;

  get skip(): number {
    if (this.page && this.take) {
      return (this.page - 1) * this.take;
    }
    return 0;
  }
}
