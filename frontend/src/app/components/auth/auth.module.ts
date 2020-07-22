import { CommonModule } from "@angular/common";
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";

import { AuthRoutingModule } from "./auth-routing.module";
import { LandingPageComponent } from "./landing-page.component";

@NgModule({
  declarations: [LandingPageComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AuthModule {}
