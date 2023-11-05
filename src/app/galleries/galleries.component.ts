import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
// interfaces
import {LangUtilities} from "../classes/lang-uti";
// services
import {LangService} from "../services/lang.service";
// components
import { GalleryImage } from "../classes/gallery-image";

@Component({
  selector: 'app-gallery',
  templateUrl: './galleries.component.html',
  styleUrls: ['./galleries.component.css']
})

export class GalleriesComponent extends LangUtilities
{
  butts: Map<string, object> = new Map();
  imgMap: Map<string, GalleryImage> = new Map();
  galleries: Map<string, GalleryImage[]> = new Map();

  constructor(route: ActivatedRoute, langService: LangService)
  {
    super(route, "gallery", langService);
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
}
