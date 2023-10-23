import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

//interfaces, classes, types
import {Lang} from "./interfaces/lang";
import {LangUtilities} from "./classes/lang-uti";
import {LangService} from "./services/lang.service";
import {Observer} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent
{
  title = 'Projektownia';
  private readonly Lang: Lang;
  constructor(private route: ActivatedRoute)
  {
    // console.log("app.component constructed");
    this.Lang = this.LangSetter();
    LangService.SetLang(this.Lang);
  }

  private LangSetter()
  {
    let lang: Lang = "pl";
    this.route.data.subscribe(data => {
      if (Object.keys(data).length > 0) lang = Object.values(data)[0];
    }).unsubscribe();
    return lang;
  }
}


