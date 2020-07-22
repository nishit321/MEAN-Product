import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Login } from "src/app/core/models/login.model";
import { AuthService } from "src/app/core/services/auth.service";
import { NotificationService } from "src/app/core/services/notification.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit, OnDestroy {
  isFormSubmitted: Boolean = false;
  subscriptions = new Subscription();
  loginForm: FormGroup;
  constructor(
    private router: Router,
    private authService: AuthService,
    private notification: NotificationService
  ) {}

  ngOnInit() {
    this.authService.setTitle("Login Page");
    this.loginForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required]),
    });
  }

  login(loginDetailForm: FormGroup) {
    this.isFormSubmitted = true;
    if (loginDetailForm.invalid) {
      this.notification.error("Please fill all mandatory fields");
      return;
    }

    const loginDetails = loginDetailForm.value;

    const login: Login = new Login();
    login.emailAddress = loginDetails.email;
    login.password = loginDetails.password;
    this.subscriptions.add(
      this.authService.login(login).subscribe(
        (res) => {
          console.info("[Login Res]", res);
          this.notification.success(res.message);
          this.router.navigate([`/users/product`]);
        },
        (err) => {
          this.notification.error(err.message, "Login Error");
          console.error("[Login Error]", err);
        }
      )
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
