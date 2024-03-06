import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLoginDto } from 'src/Auth/dto/UserLogin.dto';
import { UserRegisterDto } from './dto/UserRegister.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiResponse({ status: 200, description: 'User logged in successfully' })
@ApiResponse({ status: 400, description: 'Bad Request' })
@ApiResponse({ status: 401, description: 'Unauthorized' })
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  async login(@Body() userLoginDto: UserLoginDto) {
    try {
      const jwtToken = await this.authService.loginUser(userLoginDto);
      return {
        message: 'User logged in successfully',
        access_token: jwtToken,
      };
    } catch (e: any) {
      return new BadRequestException(e.message);
    }
  }

  @Post('register')
  async register(@Body() userRegisterDto: UserRegisterDto) {
    try {
      console.table(userRegisterDto);
      return await this.authService.registerUser(userRegisterDto);
    } catch (e: any) {
      return new BadRequestException(e.message);
    }
  }
}
