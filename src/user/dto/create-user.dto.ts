import { IsNotEmpty, IsString } from 'class-validator';
import { IsUnique } from '../../common/decorators/is-unique.decorator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @IsUnique('User', 'username') 
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
