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
      contentPl: null,
      contentEn: null,
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
    },
    {
      compName: "about",
      contentPl: [`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam a ullamcorper lacus. Aliquam feugiat et ipsum id venenatis. Suspendisse potenti. Aenean ornare, elit eu tempus maximus, purus neque tristique nunc, et auctor leo tortor ut purus. Donec cursus, lectus vitae vestibulum varius, mi nunc convallis nisi, non euismod ipsum nisl at libero. Vestibulum sollicitudin quis nisi in scelerisque. Mauris nec tristique lectus. Vivamus mattis, tellus in facilisis porttitor, orci orci vulputate elit, vitae ultricies enim enim vitae ligula. Nunc quis aliquam urna, non venenatis erat. Vivamus porttitor diam id suscipit placerat. Sed maximus, nunc lacinia commodo viverra, nunc nulla vulputate lectus, a aliquam mauris tellus vitae ligula.`],
      contentEn: null,
    },
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
