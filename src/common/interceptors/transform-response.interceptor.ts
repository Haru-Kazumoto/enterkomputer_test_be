import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Response } from 'express';
import { map, Observable } from 'rxjs';
import { ResultResponse } from 'src/utils/response-payload';

@Injectable()
export class TransformResponseInterceptor<T> implements NestInterceptor<T, ResultResponse<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse<Response>();
    const isSuccess = response.statusCode < 300;

    return next.handle().pipe(
      map(data => ({
        status: isSuccess,
        payload: data,
        error: null
      }))
    );
  }
}