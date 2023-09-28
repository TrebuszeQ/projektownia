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
  lang: "pl" | "en" = "pl"; 
  public langSub: Subject<string> = new Subject<string>()
  static langArr: LangArray = [
    {
      compName: "ui",
      contentPl: [],
      contentEn: []
    },
    {
      compName: "slider",
      contentPl: ["szybkość"],
      contentEn: ["speed"],
    }
  ]


  constructor() { 
    this.setLang(this.lang)
  }

  setLang(lang: string) {
    this.langSub.next(lang);
    console.log(`Language set to ${lang}.`)
  }

  public fetchLangEntry(compName: string): LangEntry | null {
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
