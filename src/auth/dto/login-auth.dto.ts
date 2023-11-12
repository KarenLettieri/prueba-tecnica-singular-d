import { IsString, IsNotEmpty } from 'class-validator';

export class LoginAuthDto {
  @IsNotEmpty({ message: 'Username can not be empty' })
  @IsString({ message: 'Username must be a string' })
  username: string;

  @IsNotEmpty({ message: 'Password can not be empty' })
  @IsString({ message: 'Password must be a string' })
  password: string;
}
