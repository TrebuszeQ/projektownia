import { Injectable } from '@angular/core';
// classess, interfaces
import {GalleryImage} from "../classes/gallery-image";

@Injectable({
  providedIn: 'root'
})
export class GalleriesService {
  butts: Map<string, object> = new Map();
  imgMap: Map<string, GalleryImage> = new Map();
  galleries: Map<string, GalleryImage[]> = new Map();
  constructor()
  {
    this.butts = this.setButtMap();

  }

  private setButtMap()
  {
    let butts: Map<string, object> = new Map();
    for(let i = 0; i < 6; i++)
    {
      butts.set(`placeholder${i}`, function(){});
    }
    return butts;
  }

  private setImgMap()
  {
    let imgMap: Map<string, GalleryImage> = new Map();
    for(let i = 0; i < 10; i++)
    {
      imgMap.set(`placeholderImg${i}`, new GalleryImage(
        "src/assets/images/gallery/placeholder/gian-paolo-aliatis-Blo_g1hnp3A-unsplash.jpg",
        "Gallery image placeholder.",
        1920,
        1080
      ));
    }

    return imgMap;
  }



}
