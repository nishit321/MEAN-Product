import { MustMatch } from "src/app/shared/helper/must-match.validator";
import { SignupService } from "./../../../core/services/signup.service";
import { UserRegistration } from "./../../../core/models/userregistration.model";
import {
  FormGroup,
  Validators,
  FormControl,
  FormBuilder,
} from "@angular/forms";
import { Subscription } from "rxjs";
import { NotificationService } from "./../../../core/services/notification.service";
import { AuthService } from "src/app/core/services/auth.service";
import { Router } from "@angular/router";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Constants } from "src/app/shared/Constant";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit, OnDestroy {
  isFormSubmitted: Boolean = false;
  subscriptions = new Subscription();
  signUpForm: FormGroup;
  constructor(
    private router: Router,
    private authService: AuthService,
    private signupService: SignupService,
    private notification: NotificationService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.authService.setTitle("Registration Page");
    this.signUpForm = this.formBuilder.group(
      {
        first_name: ["", Validators.required],
        last_name: ["", Validators.required],
        email: ["", Validators.required, Validators.email],
        password: [
          "",
          Validators.required,
          Validators.pattern(Constants.PasswordPattern),
        ],
        retypepassword: ["", Validators.required],
      },
      {
        validator: MustMatch("password", "retypepassword"),
      }
    );
  }

  register(loginDetailForm: FormGroup) {
    this.isFormSubmitted = true;
    if (loginDetailForm.invalid) {
      this.notification.error("Please fill all mandatory fields");
      return;
    }

    const signUpDetails = loginDetailForm.value;

    const registeration: UserRegistration = new UserRegistration();
    registeration.emailAddress = signUpDetails.email;
    registeration.password = signUpDetails.password;
    registeration.firstName = signUpDetails.first_name;
    registeration.lastName = signUpDetails.last_name;
    this.subscriptions.add(
      this.signupService.userSignUp(registeration).subscribe(
        (res) => {
          console.info("[Login Res]", res);
          this.notification.success(res.message);
          this.router.navigate([`/login`]);
        },
        (err) => {
          this.notification.error(err.message, "Signup Error");
          console.error("[Login Error]", err);
        }
      )
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
