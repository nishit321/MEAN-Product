import { NgModule } from "@angular/core";
import { HttpClientService } from "./services/http-client.service";
import { AuthService } from "./services/auth.service";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { TokenInterceptor } from "./interceptor/token.interceptor";
import { NotificationService } from "./services/notification.service";

@NgModule({
  imports: [],
  providers: [
    AuthService,
    HttpClientService,
    NotificationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  declarations: [],
  exports: [],
})
export class CoreModule {}
