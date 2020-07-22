import { EditProductComponent } from "./product/edit-product/edit-product.component";
import { CreateProductComponent } from "./product/create-product/create-product.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ProductComponent } from "./product/product.component";
import { ProductDetailComponent } from "./product/product-detail/product-detail.component";

const routes: Routes = [
  {
    path: "",
    component: null,
    children: [
      { path: "product", component: ProductComponent },
      { path: "create-product", component: CreateProductComponent },
      { path: "update-product/:id", component: EditProductComponent },
      { path: "product-detail/:id", component: ProductDetailComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
