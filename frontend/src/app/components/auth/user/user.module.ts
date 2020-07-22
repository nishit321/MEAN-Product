import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";

import { UserRoutingModule } from "./user-routing.module";
import { NgxPaginationModule } from "ngx-pagination";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "src/app/shared/shared.module";
import { TranslateModule } from "@ngx-translate/core";
import { ProductComponent } from "./product/product.component";
import { CreateProductComponent } from './product/create-product/create-product.component';
import { EditProductComponent } from './product/edit-product/edit-product.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';

@NgModule({
  declarations: [ProductComponent, CreateProductComponent, EditProductComponent, ProductDetailComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    SharedModule,
    NgxPaginationModule,
    TranslateModule,
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class UserModule {}
