import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly configService: ConfigService,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const hashsedPassword = await this.hashPassword(createUserDto.password);
    const newUser = this.userRepo.create({
      ...createUserDto,
      password: hashsedPassword,
    });

    return await this.userRepo.save(newUser);
  }

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = Number(this.configService.get('SALT'));
    if (isNaN(saltRounds)) {
      throw new Error('SALT must be a valid number');
    }

    const salt = await bcrypt.genSalt(saltRounds);

    return await bcrypt.hash(password, salt);
  }

  async findAllUser() {
    return await this.userRepo.find();
  }

  async findOneUser(id: number) {
    return await this.userRepo.findOne({ where: { id } });
  }

  async findUsersByRole(role?: 'Admin' | 'User') {
    const users = await this.userRepo.find({ where: { role } });

    if (users.length === 0) {
      throw new NotFoundException('No User found with the specified Role');
    }

    return users;
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    const updatedUser = await this.userRepo.findOne({ where: { id } });

    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }

    Object.assign(updatedUser, updateUserDto);
    await this.userRepo.save(updatedUser);

    return updatedUser;
  }

  async deleteUser(id: number) {
    const user = await this.userRepo.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return await this.userRepo.remove(user);
  }
}
