import { applyDecorators, HttpStatus } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiUnauthorizedResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';

export function SwaggerException() {
  return applyDecorators(
    ApiBadRequestResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'BAD REQUEST',
    }),
    ApiNotFoundResponse({
      status: HttpStatus.NOT_FOUND,
      description: 'NOT FOUND',
    }),
    ApiUnauthorizedResponse({
      status: HttpStatus.UNAUTHORIZED,
      description: 'UNAUTHORIZED',
    }),
    ApiInternalServerErrorResponse({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      description: 'INTERNAL SERVER ERROR',
    })
  );
}

export function SwaggerNoAuthException() {
  return applyDecorators(
    ApiBadRequestResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'BAD REQUEST',
    }),
    ApiNotFoundResponse({
      status: HttpStatus.NOT_FOUND,
      description: 'NOT FOUND',
    }),
    ApiInternalServerErrorResponse({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      description: 'INTERNAL SERVER ERROR',
    })
  );
}
