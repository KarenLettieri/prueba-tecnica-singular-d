import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../user/services/user.service';
import { RegisterAuthDto } from '../dto/register-auth.dto';
import { LoginAuthDto } from '../dto/login-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async register(usuario: RegisterAuthDto): Promise<any> {
    try {
      const existingUser = await this.userService.findByUsername(usuario.username);
      if (existingUser) {
        throw new ConflictException('The username already exists.');
      }

      return this.userService.create(usuario);
    } catch (error) {
      throw new ConflictException('We had a problem with the register.');
    }
  }
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findByUsername(username);

    if (user && user.password === password) {
      const { password, ...result } = user.toObject();
      return result;
    }

    return null;
  }

  async login(user: LoginAuthDto): Promise<any> {
    const loggedUser = await this.userService.validateUser(user.username, user.password);

    if (!loggedUser) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { username: user.username, sub: loggedUser._id }; 

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
