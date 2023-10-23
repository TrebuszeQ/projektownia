// types, interfaces
import { Lang } from '../interfaces/lang';
// services
import { LangService } from '../services/lang.service';
import {Observer, Subscription} from "rxjs";


export class LangUtilities {

  protected Lang: Lang;
  protected LangArr;
  protected Observer: Observer<Lang>;
  protected Subscription: Subscription;
  constructor(private ComponentName: string, protected langService: LangService)
  {
      this.Lang = LangService.GetLang();
      this.LangArr = this.LangEntryGetter(this.ComponentName);

      this.Observer = {
        "next": (lang: Lang)  => {
          // console.log(ComponentName, lang);
          if(this.Lang != lang)
          {
            this.Lang = lang;
            this.LangArr = this.LangEntryGetter(this.ComponentName);
            console.log(this.ComponentName);
          }
        },
        "error": (error: Error) => { console.error(error); },
        "complete": () => {}
      }
      this. Subscription = LangService.LangSubject.subscribe(this.Observer);
  }

  // gets language entry from language service
  protected LangEntryGetter(componentName: string)
  {
    let langEntry = this.langService.fetchLangEntry(componentName);
    if (!langEntry) throw Error(`Language contest of this page couldn't been fetched. ${langEntry}`);
    else
    {
      if(this.Lang === "pl") return langEntry.contentPl;
      else return langEntry.contentEn;
    }
  }
}
