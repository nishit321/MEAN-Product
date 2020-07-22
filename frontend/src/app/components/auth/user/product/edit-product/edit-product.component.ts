import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";
import { FileUploadService } from "./../../../../../core/services/file-upload.service";
import { Subscription } from "rxjs";
import { Validators } from "@angular/forms";
import { FormControl } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { ProductService } from "./../../../../../core/services/product.service";
import { NotificationService } from "./../../../../../core/services/notification.service";
import { AuthService } from "src/app/core/services/auth.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { Product } from "src/app/core/models/product.model";

@Component({
  selector: "app-edit-product",
  templateUrl: "./edit-product.component.html",
  styleUrls: ["./edit-product.component.css"],
})
export class EditProductComponent implements OnInit {
  isFormSubmitted: Boolean = false;
  subscriptions = new Subscription();
  productForm: FormGroup;
  productId: string;
  files: any;
  productImage: string;
  constructor(
    private router: Router,
    private authService: AuthService,
    private notification: NotificationService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private fileUploadService: FileUploadService,
    private loadingService: Ng4LoadingSpinnerService
  ) {}

  ngOnInit() {
    this.authService.setTitle("Update Product");
    this.productForm = new FormGroup({
      name: new FormControl("", [Validators.required]),
      description: new FormControl(""),
      category: new FormControl("", [Validators.required]),
      image: new FormControl(""),
      price: new FormControl("", [Validators.required]),
      discount: new FormControl("", [Validators.required]),
    });
    this.route.params.subscribe((params: Params) => {
      this.productId = params["id"];
    });
    this.subscriptions.add(
      this.productService.getProductById(this.productId).subscribe(
        (res) => {
          this.setValue(res.data);
        },
        (err) => {
          this.notification.error(err.message);
          console.error("[UpdateProduct Error]", err);
        }
      )
    );
  }

  setValue(product: Product) {
    this.productImage = product.image;
    this.productForm.patchValue({
      name: product.name,
      description: product.description,
      category: product.category[0].name,
      price: product.price,
      discount: product.discount,
    });
  }

  updateProduct(productForm: FormGroup) {
    this.isFormSubmitted = true;
    if (productForm.invalid) {
      this.notification.error("Please fill all mandatory fields");
      return;
    }
    const productDetails = productForm.value;
    const product: Product = new Product();
    product.id = this.productId;
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
        this.callUpdateProduct(product);
      });
    } else {
      product.image = "";
      this.callUpdateProduct(product);
    }
  }

  callUpdateProduct(product: Product) {
    this.subscriptions.add(
      this.productService.updateProduct(product).subscribe(
        (res) => {
          this.loadingService.hide();
          this.notification.success(res.message);
          this.router.navigate([`/users/product`]);
        },
        (err) => {
          this.notification.error(err.message);
          console.error("[UpdateProduct Error]", err);
        }
      )
    );
  }

  prepareFiles(files: any) {
    this.files = files;
  }
}
