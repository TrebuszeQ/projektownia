import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpClient } from "@angular/common/http";
import {catchError, retry, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RequestHandlerService {

  constructor(protected http: HttpClient) { }

  protected async getSubscription(source: string) {
     return this.http.get(source, {
       headers: {
         "Content-Type": "application/json",
           "Accept": "application/json",
           "Cache-Control": "no-cache",
           "X-Debug-Level": "verbose",
       },
         responseType: "json",
         withCredentials: false,
         observe: "response"
     }).pipe(
       retry(3),
         catchError(this.handleRequestError)
     );
  }

  private handleRequestError(error: HttpErrorResponse) {
    if(error.error instanceof ErrorEvent) {
      console.error("An error occured: ", error.error.message);
    }
    else {
      console.error(`Server returned code ${error.error.message}`);
    }

    return throwError(() => "Server request returned error.");
  }
}
