import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Note } from '@libs/db';

export class UpsertNotePayload {
  @ApiProperty({ type: String, example: 'abc', nullable: true })
  name?: string;

  @ApiProperty({ type: String, example: 'abc', required: true })
  @IsString({ message: 'content must be a string' })
  @IsNotEmpty({ message: 'content must be not empty' })
  content: string;
}

export class UpsertNoteReponse {
  @ApiProperty({ type: String, example: 'abc' })
  id: string;

  @ApiProperty({ type: String, example: 'abc' })
  name?: string;

  @ApiProperty({ type: String, example: 'abc' })
  content: string;

  public static fromEntity(entity: Partial<Note>) {
    const dto = new UpsertNoteReponse();
    dto.id = entity.id;
    dto.name = entity.name;
    dto.content = entity.content;
    return dto;
  }

  public static fromEntities(entities: Partial<Note[]>) {
    return entities.map((x) => UpsertNoteReponse.fromEntity(x));
  }
}
