import {
  BadRequestException,
  Controller,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/Auth/guard/auth.guard';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('user')
@ApiBearerAuth()
@ApiResponse({ status: 400, description: 'Bad Request' })
@ApiResponse({ status: 401, description: 'Unauthorized' })
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('users')
  @UseGuards(AuthGuard)
  async getAllUsers() {
    try {
      return await this.userService.getAllUsers();
    } catch (e: any) {
      return new BadRequestException(e.message);
    }
  }

  @UseGuards(AuthGuard)
  @Get('user/:id')
  async profile(@Param('id') id: number) {
    try {
      return await this.userService.findOneById(id);
    } catch (e: any) {
      return new BadRequestException(e.message);
    }
  }
}
