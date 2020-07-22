import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { AuthService } from "../services/auth.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  isRefreshingToken: boolean;
  tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(private authService: AuthService) {
    this.isRefreshingToken = false;
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next
      .handle(this.addToken(request, this.authService.getAuthToken()))
      .pipe(
        map((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            return event;
          }
        }),
        catchError(
          (err: any): Observable<any> => {
            const error = err.error;
            return throwError(error);
          }
        )
      );
  }

  handle401Error(error) {
    if (
      error &&
      error.status === 401 &&
      error.error &&
      error.error.error === "invalid_grant"
    ) {
      return this.logoutUser(error);
    }
    return throwError(error.status.toString());
  }

  logoutUser(error) {
    this.authService.logout();
    return throwError(error);
  }

  addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    if (token) {
      return req.clone({ setHeaders: { Authorization: token } });
    } else {
      return req;
    }
  }
}
