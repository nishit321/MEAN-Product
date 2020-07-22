import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";
import { FileUploadService } from "./../../../../../core/services/file-upload.service";
import { ProductService } from "./../../../../../core/services/product.service";
import { Product } from "./../../../../../core/models/product.model";
import { Subscription } from "rxjs";
import { FormControl } from "@angular/forms";
import { Validators } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { NotificationService } from "./../../../../../core/services/notification.service";
import { AuthService } from "src/app/core/services/auth.service";
import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-create-product",
  templateUrl: "./create-product.component.html",
  styleUrls: ["./create-product.component.css"],
})
export class CreateProductComponent implements OnInit {
  isFormSubmitted: Boolean = false;
  subscriptions = new Subscription();
  productForm: FormGroup;
  files: any;
  constructor(
    private router: Router,
    private authService: AuthService,
    private notification: NotificationService,
    private productService: ProductService,
    private fileUploadService: FileUploadService,
    private loadingService: Ng4LoadingSpinnerService
  ) {}

  ngOnInit() {
    this.authService.setTitle("Create Product");
    this.productForm = new FormGroup({
      name: new FormControl("", [Validators.required]),
      description: new FormControl(""),
      category: new FormControl("", [Validators.required]),
      image: new FormControl(""),
      price: new FormControl("", [Validators.required]),
      discount: new FormControl("", [Validators.required]),
    });
  }

  createProduct(productForm: FormGroup) {
    this.isFormSubmitted = true;
    if (productForm.invalid) {
      this.notification.error("Please fill all mandatory fields");
      return;
    }
    const productDetails = productForm.value;
    const product: Product = new Product();
    product.name = productDetails.name;
    product.description = productDetails.description;
    product.category = productDetails.category;
    product.price = productDetails.price;
    product.discount = productDetails.discount;
    product.netPrice = +productDetails.price - +productDetails.discount;
    this.loadingService.show();
    if (!!this.files) {
      this.fileUploadService.uploadFile(this.files[0]).subscribe((result) => {
        product.image = result.data.DownloadURL;
        this.storeProduct(product);
      });
    } else {
      product.image = "";
      this.storeProduct(product);
    }
  }

  storeProduct(product: Product) {
    this.subscriptions.add(
      this.productService.addProduct(product).subscribe(
        (res) => {
          this.loadingService.hide();
          this.notification.success(res.message);
          this.router.navigate([`/users/product`]);
        },
        (err) => {
          this.notification.error(err.message);
          console.error("[CreateProduct Error]", err);
        }
      )
    );
  }
  prepareFiles(files: any) {
    this.files = files;
  }
}
