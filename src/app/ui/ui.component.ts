//  components
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
// interfaces
import { Butts } from './interfaces/butts';
// fontawesome
import { faHome, faFlag } from '@fortawesome/free-solid-svg-icons';
// services
import { LangService } from '../lang/lang.service';
import { LangUtilities } from '../lang/classes/lang-uti';

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
  constructor() {
    super("ui");
    this.setLangArr();
  }

  butts: Butts[] = [
    { name: "placeholder1", url: ""},
    { name: "placeholder2", url: ""},
    { name: "placeholder3", url: ""},
    { name: "placeholder4", url: ""},
    { name: "placeholder5", url: ""},
    { name: "placeholder6", url: ""},
    { name: "placeholder7", url: ""},
    { name: "placeholder8", url: ""},
  ]

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
    window.open(url)
    return true
  }


  // sets global language in LangService
  public setGlobalLang() {
    LangService.setLang()
    // console.log(this.langArr);
  }
}

