// types, interfaces
import { Lang } from '../interfaces/lang';
// services
import { LangService } from '../services/lang.service';
import {Observer, Subscription} from "rxjs";
import {AppComponent} from "../app.component";



export class LangUtilities {

  protected Lang: Lang;
  protected LangArr;
  protected Observer: Observer<Lang>;
  protected Subscription: Subscription;
  constructor(protected ComponentName: string,protected langService: LangService)
  {
    this.Lang = this.LangGetter();
    this.LangArr = this.LangEntryGetter(this.ComponentName);
    this.Observer = this.ObserverGetter();
    this.Subscription = AppComponent.LangSubject.subscribe(this.Observer);
    // console.log(ComponentName, this.Lang);
  }

  protected ObserverGetter(): Observer<Lang> {
    return {
      "next": (lang: Lang)  => {
        // console.log(ComponentName, lang);
        this.Lang = this.LangGetter();
        this.LangArr = this.LangEntryGetter(this.ComponentName);
      },
      "error": (error: Error) => { console.error(error); },
      "complete": () => {}
    }
  }

  protected LangGetter()
  {
    return AppComponent.getLang();
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
