import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString, IsOptional } from 'class-validator';

export class BasePagingQuery {
  @IsOptional()
  @ApiProperty({ type: Number, example: 1 })
  @IsNumberString()
  @IsNotEmpty()
  page: number;

  @ApiProperty({ type: Number, example: 12 })
  @IsNumberString()
  @IsNotEmpty()
  page_size: number;

  public static from(dto: BasePagingQuery) {
    const query = new BasePagingQuery();
    query.page = dto.page;
    query.page_size = dto.page_size;
    return query;
  }
}

export class BaseResponse<T> {
  @ApiProperty({ type: Number, example: 'success' })
  status: number;

  @ApiProperty({ example: 'request success' })
  message: string;

  data: T;
}
