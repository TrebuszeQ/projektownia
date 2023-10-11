// types, interfaces
import { LangEntry } from '../Interfaces/lang-entry';
import { Lang } from '../Interfaces/lang';
// services
import { LangService } from '../lang.service';

export class LangUtilities {

  protected lang: Lang = "en";
  protected readonly langEntry?: LangEntry | null = null;
  protected langArr?: string[] | null = null;
  constructor(ComponentName: string) {
    this.lang = "pl";
    LangService.langSub.subscribe( {
      next: (lang: Lang) => {
        if(this.lang != lang)
        {
          this.lang = lang;
          this.setLangArr();
        }
      }
    });
    const langEntry = LangService.fetchLangEntry(ComponentName);
    if(langEntry != null) this.langEntry = langEntry;
    // console.log(langEntry);
  }

  protected setLangArr() {
    if(this.lang == "pl") this.langArr = this.langEntry!.contentPl;
    else if(this.lang == "en") this.langArr = this.langEntry!.contentEn;
    // console.log(lang);
    // console.log(this.langEntry);
    // console.log(this.langArr);
  }
}
