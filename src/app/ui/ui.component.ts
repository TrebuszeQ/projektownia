// ng
import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { LangUtilities } from '../classes/lang-uti';
import { Lang } from "../interfaces/lang";
import {Butts} from "./interfaces/butts";
// rxjs
import { Observer } from "rxjs";
//  components
import {AppComponent} from "../app.component";
// interfaces
// fontawesome
import { faHome, faFlag } from '@fortawesome/free-solid-svg-icons';
// services
import { LangService } from '../services/lang.service';




@Component({
  selector: "app-ui",
  templateUrl: './ui.component.html',
  styleUrls: ['./ui.component.css'],
})
export class UiComponent extends LangUtilities
{
  faHome = faHome
  faFlag = faFlag
  menuAppeared: boolean = true;
  butts: Butts[];
  override Subscription;
  constructor(route: ActivatedRoute, langService: LangService)
  {
    super(route, "ui", langService)
    {
      this.butts = this.GetButtonArray();
      this.Subscription = AppComponent.LangSubject.subscribe(this.Observer);
    }
  }
  override ObserverGetter(): Observer<Lang>
  {
    return {
      "next": (lang: Lang) => {
        this.Lang = this.LangGetter();
        this.LangArr = this.LangEntryGetter(this.ComponentName);
        this.butts = this.GetButtonArray();
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

  async menuAppear() {
    let menu = document.getElementById("uiLeftW")
    if(menu == null) {
      console.error("menu is null.")
    }
    else if(this.menuAppeared) {
      let width = await this.getUiLeftWWidth(menu)
      this.hideMenu(menu, width)
    }
    else if(!this.menuAppeared) {
      this.showMenu(menu)
    }

  }

  async getUiLeftWWidth(menu: HTMLElement | null): Promise<number> {
    let styleM = window.getComputedStyle(menu!).getPropertyValue("width")
    let value = parseFloat(styleM)
    if (value == undefined) {
      console.error("width is undefined.")
      value = 0
    }
    return Promise.resolve(value)
  }

  public hideMenu(menu: HTMLElement | null, width: number) {
      menu!.style.setProperty("transform", `translateX(${-width}px)`)
      this.menuAppeared = false
  }


  public showMenu(menu: HTMLElement | null) {
      this.menuAppeared = true
      menu!.style.setProperty("transform", `translateX(0px)`)
  }

  public onClickRedirect(url: string | URL) {
    window.open(url, "_self");
    return true
  }

  // sets global language in LangService
  public setGlobalLang()
  {
    AppComponent.setLang();
  }
}

