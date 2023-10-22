// angular
import { ActivatedRoute } from "@angular/router";
// types, interfaces
import { Lang } from '../interfaces/lang';
// services
import { LangService } from '../services/lang.service';


export class LangUtilities {

  Lang: Lang;
  LangArr;
  constructor(ComponentName: string, route: ActivatedRoute, protected langService: LangService)
  {
      this.Lang = this.LangGetter();
      this.LangArr = this.LangEntryGetter(ComponentName);
      langService.LangSubject.subscribe((lang: Lang) =>
      {
        if(this.Lang != lang)
        {
          console.log("lol", ComponentName);
          this.Lang = lang;
          this.LangArr = this.LangEntryGetter(ComponentName);
        }
      });
    // let lang: Lang = "pl";
    // route.data.subscribe(data => {
    //   if (Object.keys(data).length > 0) lang = Object.values(data)[0];
    //   console.log("lol", ComponentName);
    // }).unsubscribe();
    //
    // if (lang != null)
    // {
    //   this.Lang = lang;
    //   LangService.SetLang();
    // }
    // else this.Lang = this.LangGetter();
    //
    // this.LangArr = this.LangEntryGetter(ComponentName);
    //
    // LangService.LangSubject.subscribe((lang: Lang) =>
    // {
    //   if(this.Lang != lang)
    //   {
    //     this.Lang = lang;
    //     this.LangArr = this.LangEntryGetter(ComponentName);
    //   }
    // });
  }

  // gets lang from LangService
  protected LangGetter()
  {
    return this.langService.GetLang();
  }


  // gets language entry from language service
  protected LangEntryGetter(componentName: string)
  {
    let lang = this.Lang;
    let langEntry = this.langService.fetchLangEntry(componentName);
    if (!langEntry) throw Error(`Language contest of this page couldn't been fetched. ${langEntry}`);
    else
    {
      if(lang == "pl") return langEntry.contentPl;
      return langEntry.contentEn;
    }
  }
}
