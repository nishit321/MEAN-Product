import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/core/services/auth.service";

@Component({
  selector: "app-header-login",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  constructor(private authService: AuthService) {}
  authInfo: any;
  ngOnInit() {
    this.authInfo = this.authService.getUserInfoAuth();
  }

  logout() {
    this.authService.logout();
  }
}
