// src/auth/auth.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/auth.entity';
import { CreateUserDto } from './dto/create-auth.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { name, email, phone, password, confirmPassword } = createUserDto;

    // Check if password and confirmPassword match
    if (password !== confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }

    // Create the user entity instance
    const user = this.userRepository.create({
      name,
      email,
      phone,
      password, 
    });

    // Save the user entity to the database
    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    // Fetch all users from the database
    return this.userRepository.find();
  }
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Find user by email
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      return { success: false, message: 'Invalid email or password' };
    }

    // Check if password matches
    if (user.password === password) {
      return { success: true, message: 'Login successful' };
    } else {
      return { success: false, message: 'Invalid email or password' };
    }
  }
}
