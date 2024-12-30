import { ICreateUserBody } from 'src/public';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUserBodyDto implements ICreateUserBody {
  @ApiProperty({ example: 'Leonel' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'user@email.com' })
  @IsString()
  email: string;

  @ApiProperty({ example: 'password1234' })
  @IsString()
  password: string;

  @ApiProperty({ example: 'password1234' })
  @IsString()
  password_confirmation: string;
}
