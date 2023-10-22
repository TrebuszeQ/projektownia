import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

//interfaces, classes, types
import {Lang} from "./interfaces/lang";
import {LangUtilities} from "./classes/lang-uti";
import {LangService} from "./services/lang.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent
{
  title = 'Projektownia';

  constructor(private route: ActivatedRoute, private langService: LangService)
  {
    console.log("appcomponent constructed");
    this.langService.SetLang();
    this.langService.LangSubject.subscribe((lang: Lang) =>
    {
      if(AppComponent.Lang != lang) AppComponent.Lang = lang;
    });
  }

  protected static Lang: Lang = AppComponent.LangGetter();

  private static LangGetter()
  {
    let lang: Lang = "pl";
    this.route.data.subscribe(data => {
      if (Object.keys(data).length > 0) lang = Object.values(data)[0];
      console.log("lol", "appcomponent");
    }).unsubscribe();
    return lang;
  }

  public static GetLang()
  {
    if(this.Lang == null) AppComponent.constructor();
    return this.Lang;
  }
}


