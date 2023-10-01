// types, interfaces
import { LangEntry } from '../Interfaces/lang-entry';
// services
import { LangService } from '../lang.service';

export class LangUtilities {
  
  protected lang = "pl" || "en";
  protected readonly langEntry?: LangEntry | null = null;
  public langArr?: string[] | null = null;
  constructor(ComponentName: string) {
    LangService.langSub.subscribe( {
      next: (lang: string) => { 
        if(this.lang != lang) {
          this.lang = lang;
        };
      }
    });
    const langEntry = LangService.fetchLangEntry(ComponentName);
    if(langEntry != null) this.langEntry = langEntry;
    console.log(langEntry);
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
