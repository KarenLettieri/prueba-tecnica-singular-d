// user/controllers/user.controller.ts
import { Controller, Post, Body, UseGuards, Request, Get } from '@nestjs/common';
import { AuthService } from '../auth/services/auth.service';
import { UserAuthGuard } from '../guards/user-auth.guard';

@Controller('auth')
@UseGuards(UserAuthGuard)  // Utiliza el guard específico de User
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('registro')
  async registro(@Body() body: any) {
    return this.authService.registro(body);
  }

  @Get('perfil')
  async getProfile(@Request() req) {
    return this.authService.validateUser(req.user.username, ''); 
  }
}
