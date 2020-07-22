import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CoreModule } from "src/app/core/core.module";
import { SharedModule } from "src/app/shared/shared.module";
import { LoginComponent } from "./login/login.component";
import { NonAuthRoutingModule } from "./non-auth-routing.module";
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    SharedModule,
    CoreModule,
    HttpClientModule,
    NonAuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class NonAuthModule {}
