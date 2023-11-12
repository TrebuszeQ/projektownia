import {Injectable, Type} from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// classess, interfaces
import { GalleryData } from "./gallery-data.ts";
// rxjs

import { retry, Observable, throwError, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GalleriesService {
  private readonly gallarySources: string[];
  // private readonly galleryNames = await this.getGalleryNames();
  private readonly galleryNames = this.getGalleryNamesFake();
  // in the future it can fetch galleries from db
  constructor(private http: HttpClient)
  {
    this.gallarySources = ["..."];
  }

  private async getJsonRequestSubscription(source: string) {
    return this.http.get<Type<any>>(this.gallarySources[source],
      {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Cache-Control": "no-cache",
          "X-Debug-Level": "verbose"
        },
        responseType: "json",
        withCredentials: false,
        observe: "response"
      }).pipe(
        retry(3),
        catchError(this.handleRequestError)
    );
  }

  private async getJsonData(source: string) {
    (await this.getJsonRequestSubscription(source)).subscribe(data => {
      return data.body;
    })
  }

  public async getGalleryNames(source: string) {
    return this.getJsonData(source);
  }

  // fake
  public getGalleryNamesFake() {
    return ["FlatX", "FlatY", "HomeX"];
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

  private async getGalleryByName(source) {
    let data: GalleryData = (await this.getJsonData(source) as GalleryData);
    
  }

}
