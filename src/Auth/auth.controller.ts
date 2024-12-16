// src/auth/auth.controller.ts
import { Controller, Post, Body, HttpException, HttpStatus,UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    console.log('Received data:', registerDto); // ดูข้อมูลที่ได้รับ

    try {
      const result = await this.authService.register(registerDto);
      return result;
    } catch (error) {
      console.error('Registration error:', error); // ดู error ที่เกิดขึ้น
      throw new HttpException(
        error.message || 'Registration failed',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    try {
      return await this.authService.login(loginDto.username, loginDto.password);
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}