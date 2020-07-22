import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BsModalService } from "ngx-bootstrap";
import { BehaviorSubject } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { Login } from "src/app/core/models/login.model";
import { ConfirmationModalComponent } from "src/app/shared/components/confirmation-modal/confirmation-modal.component";

import { ApiConstants } from "../constants/api.constant";
import { HttpClientService } from "./http-client.service";
import { Title } from "@angular/platform-browser";

// import { User, Password, Login } from '../models/login.model';
@Injectable()
export class AuthService {
  jwt_token = "auth-token";
  authUserInfo = "user-data";
  userInfo = "user-data-auth";

  constructor(
    private http_client: HttpClientService,
    private router: Router,
    private modalService: BsModalService,
    private title: Title
  ) {}

  getAuthToken() {
    return localStorage.getItem(this.jwt_token) || null;
  }

  setAuhToken(token: string) {
    localStorage.setItem(this.jwt_token, token);
  }

  setTitle(title: string) {
    this.title.setTitle(title + " | Simform");
  }

  setUserInfoAuth(userInfo: any) {
    localStorage.setItem(
      this.userInfo,
      userInfo ? btoa(JSON.stringify(userInfo)) : ""
    );
  }

  getUserInfoAuth(): any {
    if (
      localStorage.getItem(this.userInfo) !== null &&
      localStorage.getItem(this.userInfo) !== ""
    ) {
      return JSON.parse(atob(localStorage.getItem(this.userInfo)));
    } else {
      return null;
    }
  }

  login(loginModel: Login) {
    return this.http_client.post(ApiConstants.login, loginModel).pipe(
      map((res: any) => {
        if (res.data.token) {
          this.setAuhToken(res.data.token);
          debugger;
          this.setUserInfoAuth(res.data.user);
          return res;
        } else {
          return res;
        }
      }),
      catchError((error: any) => {
        console.log(error);
        throw error;
      })
    );
  }

  logout() {
    this.setAuhToken("");
    this.setUserInfoAuth("");
    this.router.navigate(["/login"]);
  }

  openConfimationModal() {
    const modal = this.modalService.show(ConfirmationModalComponent, {
      backdrop: "static",
    });
    return <ConfirmationModalComponent>modal.content;
  }
}
