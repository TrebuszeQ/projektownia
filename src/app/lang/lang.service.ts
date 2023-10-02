import { Injectable } from '@angular/core';
// rxjs
import { Subject } from 'rxjs';
// types
import { LangArray } from './Interfaces/lang-type';
// interfaces
import { LangEntry } from './Interfaces/lang-entry';

@Injectable({
  providedIn: 'root'
})
export class LangService {
  public static lang: "pl" | "en" = "pl"; 
  public static langSub: Subject<string> = new Subject<string>()
  static langArr: LangArray = [
    {
      compName: "base",
      contentPl: [],
      contentEn: [],
    },
    {
      compName: "ui",
      contentPl: ["przycisk1", "przycisk2", "przycisk3", "przycisk4", "przycisk5", "przycisk6", "przycisk7", "przycisk8"],
      contentEn: ["button1", "button2", "button3", "button4", "button5", "button6", "button7", "button8"],
    },
    {
      compName: "slider",
      contentPl: ["szybkość"],
      contentEn: ["speed"],
    }
  ]


  constructor() { 
    LangService.setLang()
  }

  
  public static setLang() {
    if (this.lang == "pl") {
      this.lang = "en" 
    }
    else if(this.lang == "en") {
      this.lang = "pl"
    }
    LangService.langSub.next(this.lang);
    console.log(`Language set to ${this.lang}.`)
  }

  public static fetchLangEntry(compName: string): LangEntry | null {
    const langArrInstance = LangService.langArr;
    for(let entry of langArrInstance)
    {

      if(entry.compName == compName) {
        return entry;
      }
    }
    return null;
  }
}
