import { Body, Controller, Post } from '@nestjs/common';
import { AuthCredentialsDto } from './auth-credentials.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/signup')
  signup(@Body() authCredentialsDto: AuthCredentialsDto) {
    this.authService.signUp(authCredentialsDto);
  }
}
