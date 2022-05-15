import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { User } from '@libs/db';

export class SignUpPayload {
  @ApiProperty({ type: String, example: 'abc', required: true })
  @IsString({ message: 'Username must be a string' })
  @IsNotEmpty({ message: 'Username must be not empty' })
  username: string;

  @ApiProperty({ type: String, example: 'abc123', required: true })
  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password must be not empty' })
  password: string;
}

export class SignUpResponse {
  @ApiProperty({ type: String, example: 'abc' })
  id: string;

  @ApiProperty({ type: String, example: 'abc' })
  username: string;

  public static fromEntity(entity: Partial<User>) {
    const dto = new SignUpResponse();
    dto.id = entity.id;
    dto.username = entity.email;
    return dto;
  }
}

export class FindUserResponse {
  @ApiProperty({ type: String, example: 'abc' })
  id: string;

  @ApiProperty({ type: String, example: 'abc' })
  email: string;

  public static fromEntity(entity: Partial<User>) {
    const dto = new FindUserResponse();
    dto.id = entity.id;
    dto.email = entity.email;
    return dto;
  }

  public static fromEntities(entities: Partial<User>[]) {
    return entities.map((entity) => FindUserResponse.fromEntity(entity));
  }
}
