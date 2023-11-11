import { IsNotEmpty } from 'class-validator';

export class RemoveTaskDto {
  @IsNotEmpty()
  id: string;
}
