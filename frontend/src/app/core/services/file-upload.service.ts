import { Injectable } from "@angular/core";
import { catchError, map } from "rxjs/operators";

import { ApiConstants } from "./../constants/api.constant";
import { HttpClientService } from "./http-client.service";

@Injectable({
  providedIn: "root",
})
export class FileUploadService {
  constructor(private http_client: HttpClientService) {}

  uploadFile(file: File) {
    let formData: FormData = new FormData();
    formData.append("file", file);

    return this.http_client
      .post(
        ApiConstants.fileUpload,
        formData,
        undefined,
        undefined,
        undefined,
        false
      )
      .pipe(
        map((res: any) => {
          console.log("[UploadFile Response]", res);
          return res;
        }),
        catchError((error: any) => {
          console.error(error);
          throw error;
        })
      );
  }
}
