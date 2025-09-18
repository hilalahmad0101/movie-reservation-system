import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class SuccessResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const handlerName = context.getHandler().name; // method name (create, update, etc.)
    const controllerName = context.getClass().name; // e.g. MoviesController

    return next.handle().pipe(
      map((data) => {
        // Default message
        let message = 'Request successful';

        switch (request.method) {
          case 'POST':
            message = 'Resource created successfully';
            break;
          case 'PATCH':
          case 'PUT':
            message = 'Resource updated successfully';
            break;
          case 'DELETE':
            message = 'Resource deleted successfully';
            break;
          case 'GET':
            message = 'Data retrieved successfully';
            break;
        }

        return {
          success: true,
          name: `${controllerName}.${handlerName}`,
          message,
          data,
        };
      }),
    );
  }
}
