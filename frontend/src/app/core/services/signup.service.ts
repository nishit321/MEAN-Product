import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';

import { ApiConstants } from '../constants/api.constant';
import { UserRegistration } from './../models/userregistration.model';
import { HttpClientService } from './http-client.service';

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  constructor(private http_client: HttpClientService) {}
  userSignUp(userDetails: UserRegistration) {
    return this.http_client.post(ApiConstants.registration, userDetails).pipe(
      map((res: any) => {
        console.log('[AdminSignUp Response]', res);
        return res;
      }),
      catchError((error: any) => {
        console.error(error);
        throw error;
      })
    );
  }
}
