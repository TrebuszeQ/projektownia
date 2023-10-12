//  components
import { Component, OnChanges, ViewEncapsulation } from '@angular/core';
// interfaces
import { Butts } from './interfaces/butts';
// fontawesome
import { faHome, faFlag } from '@fortawesome/free-solid-svg-icons';
// services
import { LangService } from '../lang/lang.service';
import { LangUtilities } from '../lang/classes/lang-uti';
import {Lang} from "../lang/Interfaces/lang";

@Component({
  selector: 'app-ui',
  templateUrl: './ui.component.html',
  styleUrls: ['./ui.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class UiComponent extends LangUtilities
{
  faHome = faHome
  faFlag = faFlag
  menuAppeared: boolean = true;
  // here
  constructor() {
    super("ui");
    this.setLangArr();
    this.butts = [
      { name: this.langArr![0], url: this.langArr![1]},
      { name: this.langArr![2], url: this.langArr![3]},
      { name: this.langArr![4], url: this.langArr![5]},
      { name: this.langArr![6], url: this.langArr![7]},
      { name: this.langArr![8], url: this.langArr![9]},
      { name: this.langArr![10], url: this.langArr![11]},
      { name: this.langArr![12], url: this.langArr![13]},
      { name: this.langArr![14], url: this.langArr![15]},
    ]
  }
  butts: Butts[];

  override setLangArr() {
    if(this.lang == "pl") this.langArr = this.langEntry!.contentPl;
    else if(this.lang == "en") this.langArr = this.langEntry!.contentEn;
    this.butts = [
      { name: this.langArr![0], url: this.langArr![1]},
      { name: this.langArr![2], url: this.langArr![3]},
      { name: this.langArr![4], url: this.langArr![5]},
      { name: this.langArr![6], url: this.langArr![7]},
      { name: this.langArr![8], url: this.langArr![9]},
      { name: this.langArr![10], url: this.langArr![11]},
      { name: this.langArr![12], url: this.langArr![13]},
      { name: this.langArr![14], url: this.langArr![15]},
    ]
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
    LangService.setLang()
    // console.log(this.langArr);
  }
}

