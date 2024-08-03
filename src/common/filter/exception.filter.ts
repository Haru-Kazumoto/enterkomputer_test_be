import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { ResultResponse } from 'src/utils/response-payload';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();

        const errorResponse: ResultResponse<null> = {
            status: false,
            payload: null,
            error: {
                statusCode: status,
                path: request.url,
                errorMessage: exception.message
            }
        }

        response.status(status).json(errorResponse);
    }
}
