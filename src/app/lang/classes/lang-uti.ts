// types, interfaces
import { LangEntry } from '../Interfaces/lang-entry';
import { Lang } from '../Interfaces/lang';
// services
import { LangService } from '../lang.service';

export class LangUtilities {

  // protected lang: Lang = LangService.lang;
  // protected readonly langEntry?: LangEntry | null = this.GetLangEntry(this.lang);
  // protected langArr?: string[] | null = this.GetLangArr(this.lang);
  // constructor(ComponentName: string) {
  //   // LangService.langSub.subscribe( {
  //   //   next: (lang: Lang) => this.lang != lang ? this.lang = lang : this.lang,
  //   // });
  //   // this.langEntry = this.GetLangEntry(ComponentName);
  //   // console.log(langEntry);
  //
  // }

  protected LangGetter()
  {
    return LangService.lang;
  }

  protected LangEntryGetter(componentName: string)
  {
    let lang = this.LangGetter();
    let langEntry: LangEntry | null = LangService.fetchLangEntry(componentName);
    if (langEntry != null)
    {
      if(lang == "pl") return langEntry.contentPl;
      return langEntry.contentEn
    }
    else throw new Error("Language contest of this page couldn't been fetched.");
  }
  // protected GetLangArr(lang: Lang)
  // {
  //   if(lang == "pl") return this.langEntry!.contentPl;
  //   return this.langEntry!.contentEn;
  // }
  //
  // protected GetLangEntry(ComponentName: string)
  // {
  //   return LangService.fetchLangEntry(ComponentName);
  // }
  //
  // protected setLangArr(lang: Lang) {
  //   if(lang == "pl") this.langArr = this.langEntry!.contentPl;
  //   else if(lang == "en") this.langArr = this.langEntry!.contentEn;
  // }
  //
}
