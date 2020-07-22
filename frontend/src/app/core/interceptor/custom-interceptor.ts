import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { AuthService } from "../services/auth.service";

@Injectable()
export class CustomInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token: string = localStorage.getItem("auth-token") || null;

    if (token) {
      request = request.clone({
        headers: request.headers.set("Authorization", token),
      });
    }

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        return event;
      }),
      catchError((err: any) => {
        if (err.status === 401) {
          this.handle401Error(request, next, err);
        }
        return throwError(err);
      })
    );
  }
  handle401Error(
    req: HttpRequest<any>,
    next: HttpHandler,
    err: HttpErrorResponse
  ) {
    return this.logoutUser("");
  }

  logoutUser(error) {
    this.authService.logout();
    this.router.navigate(["/users/login"]);
  }
}
