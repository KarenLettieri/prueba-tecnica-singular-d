
import { Controller, Post, Body, UseGuards, Request, Get } from '@nestjs/common';
import { AuthService } from '../../auth/services/auth.service';
import { UserAuthGuard } from '../guards/user-auth.guard';

@Controller('auth')
@UseGuards(UserAuthGuard)  
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async registro(@Body() body: any) {
    return this.authService.register(body);
  }

  @Get('profile')
  async getProfile(@Request() req) {
    return this.authService.validateUser(req.user.username, ''); 
  }
}
