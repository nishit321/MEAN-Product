import { Router } from "@angular/router";
import { ConfirmationModalComponent } from "./../../../../shared/components/confirmation-modal/confirmation-modal.component";
import { Product } from "./../../../../core/models/product.model";
import { NotificationService } from "./../../../../core/services/notification.service";
import { ProductService } from "./../../../../core/services/product.service";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/core/services/auth.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.css"],
})
export class ProductComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private productService: ProductService,
    private notification: NotificationService,
    private router: Router
  ) {}

  modalComponent: ConfirmationModalComponent;
  products: Product[];
  subscriptions = new Subscription();
  pageNumber: number = 1;

  ngOnInit() {
    this.authService.setTitle("Product Listing");
    this.getProducts();
  }

  getProducts() {
    this.subscriptions.add(
      this.productService.getProduct().subscribe(
        (res) => {
          this.products = res.data;
        },
        (err) => {
          this.notification.error(err.message, "Product Error");
          console.error("[Product Error]", err);
        }
      )
    );
  }

  delete(id: string) {
    this.modalComponent = this.authService.openConfimationModal();
    this.modalComponent.showConfirmationModal(
      `Logout`,
      `Are you sure want to delete?`,
      `Yes`,
      `No`
    );
    this.subscriptions.add(
      this.modalComponent.onClose.subscribe((result) => {
        if (result) {
          this.subscriptions.add(
            this.productService.deleteProduct(id).subscribe(
              (res) => {
                debugger;
                this.notification.success(res.message);
                this.getProducts();
              },
              (err) => {
                this.notification.error(err.message, "Product Error");
                console.error("[Product Error]", err);
              }
            )
          );
        } else {
          this.modalComponent.onClose.unsubscribe();
        }
      })
    );
  }

  updateProduct(id: string) {
    this.router.navigate(["users/update-product", id]);
  }

  viewProduct(id: string) {
    this.router.navigate(["users/product-detail", id]);
  }
}
