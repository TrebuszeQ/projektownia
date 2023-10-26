import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
// interfaces
import {LangUtilities} from "../classes/lang-uti";
import {ImageGallery} from "../classes/gallery";
import {GalleryImage} from "../classes/gallery-image";
// services
import {LangService} from "../services/lang.service";

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})

export class GalleryComponent extends LangUtilities
{
  butts: Map<string, object> = new Map();
  imgMap: Map<string, GalleryImage> = new Map();
  galleries: Map<string, GalleryImage[]> = new Map();

  constructor(route: ActivatedRoute, langService: LangService)
  {
    super(route, "gallery", langService);
  }

}
