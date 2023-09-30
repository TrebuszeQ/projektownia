import { Component } from '@angular/core';
// types, interfaces
import { LangEntry } from '../lang/Interfaces/lang-entry';
// services
import { LangService } from '../lang/lang.service';


@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: []
})
export class BaseComponent {
  protected lang = "pl" || "en";
  protected readonly langEntry?: LangEntry | null = null;
  public langArr?: string[] | null = null;
  public Lol = "";
  constructor(protected langService: LangService) {
    langService.langSub.subscribe( {
      next: (lang: string) => { 
        if(this.lang != lang) {
          this.setLangArr(lang);
          this.lang = lang;
        };
      }
    });
    
    langService = this.langService;

    const langEntry = this.langService.fetchLangEntry("slider");
    if(langEntry != null) this.langEntry = langEntry;
  }

  protected setLangArr(lang: string) {
    const longArrPl: string[] = this.langEntry!.contentPl;
    const longArrEn: string[] = this.langEntry!.contentEn;

    if(lang == "pl") this.langArr = longArrPl;
    else if(lang == "en") this.langArr = longArrEn;
    // console.log(lang);
    // console.log(this.langEntry);
    // console.log(this.langArr);
  }
}
