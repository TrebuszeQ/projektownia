import { Injectable } from '@angular/core';
// classess, interfaces
import { GalleryImage } from '../classes/gallery-image';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Config } from '@fortawesome/fontawesome-svg-core';

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

  // private prepareRequest(galleryKey: string) {
  //   const url = this.BaseUrl + galleryKey;
  //   const headers = new Headers();
  //   headers.append("content-type", "image/jpeg");
  //   const options: RequestInit = {
  //     method: "GET",
  //     headers: headers,
  //     mode: "cors",
  //     cache: "default",
  //   };
  //   return new Request(url, options);
  // }

  // private fetchGalleryNames(galleryKey: string) {
  //   const url = this.BaseUrl + galleryKey;
  //   const headers = new Headers();
  //   headers.append("content-type", "text/plain");
    
  // }


  private getGalleryNames(galleryKey: string) {
    let resBody = null;
    this.http.get<Config>(this.BaseUrl + galleryKey, {
      params: {},
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Cache-Control": "no-cache",
        "X-Debug-Level": "verbose",
      },
      responseType: "json",
      withCredentials: false,
      observe: "response"
    }).subscribe(response => {
      resBody = response.body;
      console.log("Response status:", response.status);
      console.log("Body:", response.body);
    });
    
    return resBody;
  }

  private getGalleryImages() {
    
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
