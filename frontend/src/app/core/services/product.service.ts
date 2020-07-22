import { Product } from "./../models/product.model";
import { catchError } from "rxjs/operators";
import { map } from "rxjs/operators";
import { ApiConstants } from "./../constants/api.constant";
import { HttpClientService } from "./http-client.service";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  constructor(private http_client: HttpClientService) {}
  getProduct() {
    return this.http_client.get(ApiConstants.getProduct).pipe(
      map((res: any) => {
        console.log("[getProduct Response]", res);
        return res;
      }),
      catchError((error: any) => {
        console.error(error);
        throw error;
      })
    );
  }

  deleteProduct(id: string) {
    return this.http_client.delete(`${ApiConstants.getProduct}/${id}`).pipe(
      map((res: any) => {
        console.log("[getProduct Response]", res);
        return res;
      }),
      catchError((error: any) => {
        console.error(error);
        throw error;
      })
    );
  }

  addProduct(product: Product) {
    return this.http_client.post(ApiConstants.getProduct, product).pipe(
      map((res: any) => {
        console.log("[getProduct Response]", res);
        return res;
      }),
      catchError((error: any) => {
        console.error(error);
        throw error;
      })
    );
  }

  updateProduct(product: Product) {
    return this.http_client.put(ApiConstants.getProduct, product).pipe(
      map((res: any) => {
        console.log("[getProduct Response]", res);
        return res;
      }),
      catchError((error: any) => {
        console.error(error);
        throw error;
      })
    );
  }

  getProductById(id: string) {
    return this.http_client.get(`${ApiConstants.getProduct}/${id}`).pipe(
      map((res: any) => {
        console.log("[getProductById Response]", res);
        return res;
      }),
      catchError((error: any) => {
        console.error(error);
        throw error;
      })
    );
  }
}
