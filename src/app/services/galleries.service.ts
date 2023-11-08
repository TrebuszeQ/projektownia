import { Injectable } from '@angular/core';
// classess, interfaces
import { GalleryImage } from '../classes/gallery-image';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Config } from '@fortawesome/fontawesome-svg-core';
import { retry, Observable, throwError, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GalleriesService {
  private readonly Galleries: Map<string, GalleryImage[]> = new Map();
  private readonly BaseUrl;
  // in the future it can fetch galleries from db
  constructor(private http: HttpClient)
  {
    this.Galleries.set("gallery1", this.generateGallery("gallery1") || []);
    this.BaseUrl = "placeholderurl";
  }
  
  public getGalleryNames(galleryKey: string) {
    return this.http.get<Observable<JSON>>(this.BaseUrl + galleryKey,
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
      })
    .pipe(
      catchError((this.handleError))
    )
    .subscribe(
      (data) => {
        console.log(data);
      }
    );
  }

  public getGalleryNamesFake(galleryKey: string) {
  
  }
  
  private handleError(error: HttpErrorResponse) {
    if(error.error instanceof ErrorEvent) {
      console.error("An error occured: ", error.error.message);
    } 
    else {
      console.error(`Server returned code ${error.error.message}`);
    }

    return throwError(() => "Server request returned error.");
  }

  private generateGallery(galleryKey: string) {
    let arr = [];
    if (this.Galleries.has(galleryKey))
    {
      for(let i = 0; i < 20; i++) {
        let src = "src/assets/images/gallery/placeholder/laura-lauch-o_vJVPYz4jI-unsplash.jpg";
        arr.push(new GalleryImage(`${galleryKey}placeholderImage${i}`, `${galleryKey}Image${i}`, src, "Interior design portfolio photography.", null, null));
      }
    }
    else return null;
    return arr;
  }

}
