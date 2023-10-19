import { Component } from '@angular/core';
import {LangUtilities} from "./lang/classes/lang-uti";
import {LangService} from "./lang/lang.service";
import {Lang} from "./lang/Interfaces/lang";
import {Subject} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent
{
  title = 'projektownia';
  protected static lang: Lang = "pl";
  constructor()
  {
    console.log(AppComponent.lang);
  }

  public static GetLang()
  {
    return this.lang;
  }
}
