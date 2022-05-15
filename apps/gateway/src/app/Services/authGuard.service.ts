import { BaseResponse } from '@libs/dtos';
import {
  Injectable,
  Inject,
  CanActivate,
  ExecutionContext,
  HttpException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AxiosBase } from './axios.service';

@Injectable()
export class AuthGuard implements CanActivate {
  userServiceClient: AxiosBase;
  tokenServiceClient: AxiosBase;

  constructor(private readonly reflector: Reflector) {
    this.userServiceClient = new AxiosBase(process.env.USER_MS_URL, {
      'x-api-key': process.env.SECRET,
    });
    this.tokenServiceClient = new AxiosBase(process.env.TOKEN_MS_URL, {
      'x-api-key': process.env.SECRET,
    });
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const secured = this.reflector.get<string[]>(
      'secured',
      context.getHandler()
    );

    if (!secured) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const userTokenInfo = await this.tokenServiceClient.post<any>(
      'token_decode',
      {
        token: request.headers.authorization,
      }
    );

    if (!userTokenInfo || !userTokenInfo.data) {
      throw new HttpException(
        {
          message: userTokenInfo.message,
          data: null,
          errors: null,
        },
        userTokenInfo.status
      );
    }

    const userInfo = await this.userServiceClient.post<any>(
      'user_get_by_id',
      userTokenInfo.data.userId
    );

    request.user = userInfo.data;
    return true;
  }
}
