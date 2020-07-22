import { RegisterComponent } from "./register/register.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { LoginComponent } from "./login/login.component";

const routes: Routes = [
  {
    path: "",
    component: null,
    children: [
      { path: "login", component: LoginComponent },
      { path: "signup", component: RegisterComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), TranslateModule],
  exports: [RouterModule, TranslateModule],
})
export class NonAuthRoutingModule {}
