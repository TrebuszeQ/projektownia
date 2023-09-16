//  components
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

// interfaces
import { Butts } from './interfaces/butts';

// fontawesome
import { faHome, faFlag } from '@fortawesome/free-solid-svg-icons';;

// services
import { LangService } from '../lang/lang.service';

@Component({
  selector: 'app-ui',
  templateUrl: './ui.component.html',
  styleUrls: ['./ui.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class UiComponent implements OnInit {
  faHome = faHome
  faFlag = faFlag
  menuAppeared: boolean = true
  lang: string = "pl"
  
  butts: Butts[] = [
    { name: "placeholder1", url: "", cssId: null, cssClass: null },
    { name: "placeholder2", url: "", cssId: null, cssClass: null },
    { name: "placeholder3", url: "", cssId: null, cssClass: null },
    { name: "placeholder4", url: "", cssId: null, cssClass: null },
    { name: "placeholder5", url: "", cssId: null, cssClass: null },
    { name: "placeholder6", url: "", cssId: null, cssClass: null },
    { name: "placeholder7", url: "", cssId: null, cssClass: null },
    { name: "placeholder8", url: "", cssId: null, cssClass: null },
  ]

  constructor(private langService: LangService) {}

  ngOnInit(): void {
    this.setLocalLang()
  } 

  
  async menuAppear() {
    let menu = document.getElementById("uiLeftW")
    if(menu == null) {
      console.error("menu is null.")
    }
    else if(this.menuAppeared && menu != null) {
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

  async hideMenu(menu: HTMLElement | null, width: number) {
      menu!.style.setProperty("transform", `translateX(${-width}px)`)
      this.menuAppeared = false
  }

  async showMenu(menu: HTMLElement | null) {
      this.menuAppeared = true
      menu!.style.setProperty("transform", `translateX(0px)`)
  }

  onClickRed(url: string | URL) {
    window.open(url)
    return true
  }

  setGlobalLang() {
    if (this.lang == "pl") {
      this.lang = "en" 
    }
    else if(this.lang == "en") {
      this.lang = "pl"
    }
    this.langService.setLang(this.lang)
    this.setLocalLang()
    
  }

  async setLocalLang() {
    await this.setButtsLang()
  }

  async setButtsLang() {
    if (this.lang == "pl") {
      this.butts = [
        { name: "Polish1", url: "", cssId: null, cssClass: null },
        { name: "Polish2", url: "", cssId: null, cssClass: null },
        { name: "Polish3", url: "", cssId: null, cssClass: null },
        { name: "Polish4", url: "", cssId: null, cssClass: null },
        { name: "Polish5", url: "", cssId: null, cssClass: null },
        { name: "Polish6", url: "", cssId: null, cssClass: null },
        { name: "Polish7", url: "", cssId: null, cssClass: null },
        { name: "Polish8", url: "", cssId: null, cssClass: null },
      ]
    }
    else if (this.lang == "en") {
      this.butts = [
        { name: "English1", url: "", cssId: null, cssClass: null },
        { name: "English2", url: "", cssId: null, cssClass: null },
        { name: "English3", url: "", cssId: null, cssClass: null },
        { name: "English4", url: "", cssId: null, cssClass: null },
        { name: "English5", url: "", cssId: null, cssClass: null },
        { name: "English6", url: "", cssId: null, cssClass: null },
        { name: "English7", url: "", cssId: null, cssClass: null },
        { name: "English8", url: "", cssId: null, cssClass: null },
      ]
    }
  }
}

