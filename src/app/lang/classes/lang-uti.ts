// types, interfaces
import { Lang } from '../Interfaces/lang';
// services
import { LangService } from '../lang.service';
import {ActivatedRoute} from "@angular/router";

export class LangUtilities {

  Lang: Lang;
  LangArr;
  constructor(ComponentName: string, route: ActivatedRoute)
  {
    route.data.subscribe(data => {
      if (Object.keys(data).length > 0)
      {
        console.log(data);
        let lang = Object.values(data)[0];
        console.log(lang);
      }
    });
    this.Lang = this.LangGetter();
    this.LangArr = this.LangEntryGetter(ComponentName);

    LangService.LangSubject.subscribe((lang: Lang) =>
    {
      this.Lang = lang;
      this.LangArr = this.LangEntryGetter(ComponentName);
    });
  }

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
