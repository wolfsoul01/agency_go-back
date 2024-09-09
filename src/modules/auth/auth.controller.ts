import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body) {
    const { email, password } = body;

    if (!email || !password) {
      throw new UnauthorizedException('Email y contraseña son obligatorios');
    }

    return this.authService.login(email, password);
  }

  // Logout se puede manejar desde el cliente simplemente eliminando el token
  @Post('logout')
  logout() {
    return { message: 'Logout realizado con éxito' };
  }
}
