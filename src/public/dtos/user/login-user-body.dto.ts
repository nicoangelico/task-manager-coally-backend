import { ILoginUserBody } from 'src/public';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginUserBodyDto implements ILoginUserBody {
  @ApiProperty({ example: 'user@email.com' })
  @IsString()
  email: string;

  @ApiProperty({ example: 'pass' })
  @IsString()
  password: string;
}
