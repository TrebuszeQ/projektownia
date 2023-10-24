// angular
import {ActivatedRoute} from "@angular/router";
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
  constructor(private ComponentName: string, protected route: ActivatedRoute ,protected langService: LangService)
  {
    this.Lang = this.LangGetter();
    this.LangArr = this.LangEntryGetter(this.ComponentName);
    this.Observer = {
      "next": (lang: Lang)  => {
        // console.log(ComponentName, lang);
        if(this.Lang != lang)
        {
          this.Lang = lang;
          console.log(this.Lang);
          this.LangArr = this.LangEntryGetter(this.ComponentName);
          // console.log(this.ComponentName);
        }
      },
      "error": (error: Error) => { console.error(error); },
      "complete": () => {}
    }
    this.Subscription = LangService.LangSubject.subscribe(this.Observer);
  }

  private LangGetter(lang?: Lang)
  {
    if(lang !== this.Lang || lang == null)
    {
      lang = "pl";
      this.route.data.subscribe(data => {
        if (lang === "pl" || lang === "en") lang = Object.values(data)[0];
      }).unsubscribe();
    }
    return lang;
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
