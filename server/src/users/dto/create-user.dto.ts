import { IsString, IsEmail, IsNotEmpty, IsEnum } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: any;

  @IsNotEmpty()
  @IsEnum(['Admin', 'User'], {
    message: 'Valid Role Required',
  })
  role: 'Admin' | 'User';
}
