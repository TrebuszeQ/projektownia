import { Component } from '@angular/core';
import {LangUtilities} from "../classes/lang-uti";
import {ActivatedRoute} from "@angular/router";
import {LangService} from "../services/lang.service";
import {AppComponent} from "../app.component";
import {Observer} from "rxjs";
import {Lang} from "../interfaces/lang";
// interfaces
import { Butts } from "../interfaces/butts";
@Component({
  selector: 'app-gallery-menu',
  templateUrl: './gallery-menu.component.html',
  styleUrls: ['./gallery-menu.component.css']
})
export class GalleryMenuComponent extends LangUtilities {
  private ApiSource;
  private Butts: Butts[];

  constructor(route: ActivatedRoute, langService: LangService) {
    super(route, "galMenu", langService) {
      this.Butts = this.GetButtonArray();
      this.Subscription = AppComponent.LangSubject.subscribe(this.Observer);
    }
    this.ApiSource = "https://httpbin.org/get";
    this.Butts = [

    ];
  }
  override ObserverGetter(): Observer<Lang>
  {
    return {
      "next": (lang: Lang) => {
        this.Lang = this.LangGetter();
        this.LangArr = this.LangEntryGetter(this.ComponentName);
        this.Butts = this.GetButtonArray();
      },
      "error": (error: Error) => {
        console.error(error);
      },
      "complete": () => {
      }
    }
  }
  private GetButtonArray()
  {
    return [
      { name: this.LangArr![0], url: this.LangArr![1]},
      { name: this.LangArr![2], url: this.LangArr![3]},
      { name: this.LangArr![4], url: this.LangArr![5]},
      { name: this.LangArr![6], url: this.LangArr![7]},
      { name: this.LangArr![8], url: this.LangArr![9]},
      { name: this.LangArr![10], url: this.LangArr![11]},
      { name: this.LangArr![12], url: this.LangArr![13]},
      { name: this.LangArr![14], url: this.LangArr![15]},
    ];
  }
}
