import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  CanActivate,
  Router,
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../core/services/auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    const token = this.authService.getAuthToken();
    console.log("auth guard token", token);
    if (!token) {
      console.log("route data : ", route.data);
      this.router.navigate(["/users/login"]);
      return false;
    } else {
      return true;
    }
  }
}
