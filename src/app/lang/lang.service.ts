import { Injectable } from '@angular/core';
// rxjs
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LangService {
  lang: string = "pl"
  private langSub: Subject<string> = new Subject<string>()
  constructor() { 
    this.setLang(this.lang)
  }

  setLang(lang: string) {
    this.langSub.next(lang);
    console.log(`Language set to ${lang}.`)
  }
}
