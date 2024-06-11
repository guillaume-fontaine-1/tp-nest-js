import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class UserInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // Logic before the request is handled by the route handler
    console.log('Intercepting user request...');
    
    // Execution of the route handler
    const now = Date.now();
    return next.handle().pipe(
      // Logic after the request is handled by the route handler
      map(data => {
        console.log(`User request handled in ${Date.now() - now}ms`);
        return data;
      }),
    );
  }
}
