import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();
    const req = ctx.getRequest();

    const isHttp = exception instanceof HttpException;
    const status = isHttp ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const payload = isHttp ? exception.getResponse() : { message: 'Internal server error' };
    console.log(exception);
    const message = typeof payload === 'string' ? payload : (payload as any).message ?? payload;

    res.status(status).json({
      success: false,
      data: {
        path: req.url,
        statusCode: status,
        message,
      },
    });
  }
}
