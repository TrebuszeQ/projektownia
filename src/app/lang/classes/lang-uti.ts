// types, interfaces
import { LangEntry } from '../Interfaces/lang-entry';
import { Lang } from '../Interfaces/lang';
// services
import { LangService } from '../lang.service';

export class LangUtilities {

  Lang;
  LangArr;
  constructor(ComponentName: string)
  {
    this.Lang = this.LangGetter();
    this.LangArr = this.LangEntryGetter(ComponentName);

    LangService.LangSubject.subscribe((lang: Lang) =>
    {
      this.Lang = lang;
      console.log(lang);
      this.LangArr = this.LangEntryGetter(ComponentName);
    });
  }


  // protected RefreshLang(ComponentName: string, lang: Lang)
  // {
  //   console.log("lol");
  //   this.Lang = lang;
  //   this.LangArr = this.LangEntryGetter(ComponentName);
  // }


  // gets lang from LangService
  protected LangGetter()
  {
    return LangService.GetLang();
  }


  // gets language entry from language service
  protected LangEntryGetter(componentName: string)
  {
    let lang = this.Lang;
    let langEntry = LangService.fetchLangEntry(componentName);
    if (!langEntry) throw Error(`Language contest of this page couldn't been fetched. ${langEntry}`);
    else
    {
      if(lang == "pl") return langEntry.contentPl;
      return langEntry.contentEn;
    }
  }
}
