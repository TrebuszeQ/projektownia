import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
// interfaces
import {LangUtilities} from "../classes/lang-uti";
// services
import {LangService} from "../services/lang.service";
// components
import { GalleryImageComponent } from "../gallery-image/gallery-image.component";

@Component({
  selector: 'app-gallery',
  templateUrl: './galleries.component.html',
  styleUrls: ['./galleries.component.css']
})

export class GalleriesComponent extends LangUtilities
{
  butts: Map<string, object> = new Map();
  imgMap: Map<string, GalleryImageComponent> = new Map();
  galleries: Map<string, GalleryImageComponent[]> = new Map();

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
