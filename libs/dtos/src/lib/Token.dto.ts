import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Token } from '@libs/db';

export class SignInPayload {
  @ApiProperty({ type: String, example: 'abc', required: true })
  @IsString({ message: 'Username must be a string' })
  @IsNotEmpty({ message: 'Username must be not empty' })
  username: string;

  @ApiProperty({ type: String, example: 'abc123', required: true })
  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password must be not empty' })
  password: string;
}

export class SignInResponse {
  @ApiProperty({ type: String, example: 'token' })
  token: string;

  public static fromEntity(entity: Partial<Token>) {
    const dto = new SignInResponse();
    dto.token = entity.token;
    return dto;
  }
}

export class CreateTokenReponse {
  @ApiProperty({ type: String, example: 'token' })
  token: string;

  public static fromEntity(entity: Partial<Token>) {
    const dto = new SignInResponse();
    dto.token = entity.token;
    return dto;
  }
}

export class TokenDecodedPayload {
  @ApiProperty({ type: String, example: 'user id' })
  userId: string;
}
