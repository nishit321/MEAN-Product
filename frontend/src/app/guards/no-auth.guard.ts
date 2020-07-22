import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";

import { AuthService } from "../core/services/auth.service";

@Injectable({
  providedIn: "root",
})
export class NoAuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    const token = this.authService.getAuthToken();
    if (token) {
      this.router.navigate(["/users/product"]);
      return false;
    } else {
      return true;
    }
  }
}
