import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map } from "rxjs/operators";
import { environment } from "src/environments/environment";

import { IHttpOptions } from "../interfaces/http-interface";

@Injectable()
export class HttpClientService {
  constructor(private http: HttpClient) {}

  get(url: string, headers?: any, params?: any, options?: IHttpOptions) {
    url = this.updateUrl(url);
    return this.http.get(url, <any>this.httpOptions);
  }

  post(
    url: string,
    body: any,
    headers?: any,
    params?: any,
    options?: IHttpOptions,
    isHttpHeader: Boolean = true
  ) {
    url = this.updateUrl(url);
    if (isHttpHeader) {
      return this.http.post(url, body, <any>this.httpOptions);
    } else {
      return this.http.post(
        url,
        body,
        Object.assign({}, { reportProgress: true })
      );
    }
  }

  put(
    url: string,
    body: any,
    headers?: any,
    params?: any,
    options?: IHttpOptions
  ) {
    url = this.updateUrl(url);
    return this.http.put(url, body, <any>this.httpOptions);
  }

  delete(url: string, headers?: any, params?: any, options?: IHttpOptions) {
    url = this.updateUrl(url);
    return this.http.delete(url, this.httpOptions).pipe(
      map((res) => res),
      catchError((error) => {
        throw error;
      })
    );
  }

  private updateUrl(req: string) {
    if (req.indexOf("http://") === -1) {
      return environment.origin + req;
    } else {
      return req;
    }
  }

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    }),
  };
}
