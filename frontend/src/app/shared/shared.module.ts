import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { BsDropdownModule } from "ngx-bootstrap";
import { NgSelectModule } from "@ng-select/ng-select";
import { ToastrModule } from "ngx-toastr";
import { ConfirmationModalComponent } from "./components/confirmation-modal/confirmation-modal.component";
import { HeaderComponent } from "./components/header/header.component";
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    NgSelectModule,
    BsDropdownModule.forRoot(),
    ToastrModule.forRoot(),
  ],
  declarations: [HeaderComponent, ConfirmationModalComponent],
  exports: [
    BsDropdownModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    HeaderComponent,
  ],
  schemas: [NO_ERRORS_SCHEMA],
  entryComponents: [ConfirmationModalComponent],
})
export class SharedModule {}
