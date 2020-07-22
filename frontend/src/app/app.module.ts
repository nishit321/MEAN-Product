import { AsyncPipe } from "@angular/common";
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
} from "@angular/common/http";
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { BrowserModule, Title } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { LoadingBarRouterModule } from "@ngx-loading-bar/router";
import { Ng4LoadingSpinnerModule } from "ng4-loading-spinner";
import { ModalModule } from "ngx-bootstrap";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CoreModule } from "./core/core.module";
import { CustomInterceptor } from "./core/interceptor/custom-interceptor";
import { BlankLayoutComponent } from "./layouts/blank-layout/blank-layout.component";
import { MasterLayoutComponent } from "./layouts/master-layout/master-layout.component";
import { SharedModule } from "./shared/shared.module";

@NgModule({
  declarations: [AppComponent, BlankLayoutComponent, MasterLayoutComponent],
  imports: [
    PerfectScrollbarModule,
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    CoreModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    Ng4LoadingSpinnerModule.forRoot(),
    LoadingBarRouterModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomInterceptor,
      multi: true,
    },
    AsyncPipe,
    Title,
  ],
  schemas: [NO_ERRORS_SCHEMA],
  bootstrap: [AppComponent],
  entryComponents: [],
  exports: [],
})
export class AppModule {}
