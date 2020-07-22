import { Subscription } from "rxjs";
import { ProductService } from "./../../../../../core/services/product.service";
import { NotificationService } from "./../../../../../core/services/notification.service";
import { AuthService } from "src/app/core/services/auth.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { Product } from "src/app/core/models/product.model";

@Component({
  selector: "app-product-detail",
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.css"],
})
export class ProductDetailComponent implements OnInit {
  productId: string;
  product: Product;
  subscriptions = new Subscription();
  constructor(
    private router: Router,
    private authService: AuthService,
    private notification: NotificationService,
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.authService.setTitle("Product Detail");
    this.route.params.subscribe((params: Params) => {
      this.productId = params["id"];
    });
    this.subscriptions.add(
      this.productService.getProductById(this.productId).subscribe(
        (res: any) => {
          this.product = res.data;
        },
        (err) => {
          this.notification.error(err.message);
          console.error("[UpdateProduct Error]", err);
        }
      )
    );
  }
}
