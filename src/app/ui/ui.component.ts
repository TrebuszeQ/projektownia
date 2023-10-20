// angular
import {
  ActivatedRoute, RouterStateSnapshot, Route
} from "@angular/router";
//  components
import { Component, ViewEncapsulation } from '@angular/core';
// interfaces
// fontawesome
import { faHome, faFlag } from '@fortawesome/free-solid-svg-icons';
// services
import { LangService } from '../lang/lang.service';
import { LangUtilities } from '../lang/classes/lang-uti';
import {Lang} from "../lang/Interfaces/lang";


@Component({
  selector: "app-ui",
  templateUrl: './ui.component.html',
  styleUrls: ['./ui.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [
  ]
})
export class UiComponent extends LangUtilities
{
  faHome = faHome
  faFlag = faFlag
  menuAppeared: boolean = true;
  // here
  constructor(private route: ActivatedRoute) {
    super("ui", route)
    {
      LangService.LangSubject.subscribe((lang: Lang) =>
      {
        this.Lang = lang;
        this.LangArr = this.LangEntryGetter("ui");
        this.butts = this.GetButtonArray();
      });
    }
  }

  butts = this.GetButtonArray();
  private GetButtonArray()
  {
    if(this.LangArr === null) this.constructor();
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
  public setGlobalLang() {
    LangService.setLang();
    // console.log(this.langArr);
  }
}

