import { Injectable } from '@angular/core';
// classess, interfaces
import {GalleryImageComponent} from "../gallery-image/gallery-image.component";

@Injectable({
  providedIn: 'root'
})
export class GalleriesService {
  private readonly Galleries: Map<string, GalleryImageComponent[]> = new Map();
  private readonly BaseUrl;
  // in the future it can fetch galleries from db
  constructor()
  {
    this.Galleries.set("gallery1", this.generateGallery("gallery1") || []);
    this.BaseUrl = "placeholderurl";
  }


  private fetchGalleryNames() {
    const headers = new Headers();
    headers.append("content-type", "text/plain");
  }

  private prepareRequest(galleryKey: string) {
    const url = this.BaseUrl + galleryKey;
    const headers = new Headers();
    headers.append("content-type", "image/jpeg");
    const options: RequestInit = {
      method: "GET",
      headers: headers,
      mode: "cors",
      cache: "default",
    };
    return new Request(url, options);
  }




  private generateGallery(galleryKey: string) {
    let arr = [];
    if (this.Galleries.has(galleryKey))
    {
      for(let i = 0; i < 20; i++) {
        let src = "src/assets/images/gallery/placeholder/laura-lauch-o_vJVPYz4jI-unsplash.jpg";
        arr.push(new GalleryImageComponent(`${galleryKey}placeholderImage${i}`, `${galleryKey}Image${i}`, src, "Interior design portfolio photography.", null, null));
      }
    }
    else return null;
    return arr;
  }

}
