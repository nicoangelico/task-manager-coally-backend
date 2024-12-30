import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateUserService, LoginService } from 'src/features/user';
import { CreateUserBodyDto, LoginUserBodyDto } from 'src/public';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('user') 
export class UserController {
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly loginService: LoginService,
  ) {}

  @Post('login')
  async loginUser(@Body() loginBody: LoginUserBodyDto) {
    return this.loginService.login(loginBody.email, loginBody.password);
  }

  @Post('create')
  async createBullishUser(@Body() body: CreateUserBodyDto) {
    return this.createUserService.create(body);
  }
}
