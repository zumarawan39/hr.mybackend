// src/auth/auth.controller.ts
import { Controller, Get, Post, Body, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-auth.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('create')
  async createUser(@Body() createUserDto: CreateUserDto) {
    const { name, email, phone, password, confirmPassword } = createUserDto;
    console.log("data come from front end =>", createUserDto);
//password  check
    if (password !== confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }
    return this.authService.createUser(createUserDto);
  }
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
  
  @Get("get")
  async findAll( ) {
    // Use the service to fetch all users
    return "get api worked"
  }
}
