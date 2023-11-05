import { Component } from '@angular/core';
// interfaces
import { Lang } from "./interfaces/lang";
import {Subject} from "rxjs";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent
{
  title = 'Projektownia';
  private static lang: Lang = "pl";
  static readonly LangSubject: Subject<Lang> = new Subject();
  constructor()
  {
    // console.log("app.component constructed");
  }

  public static getLang()
  {
    return this.lang;
  }

  public static setLang()
  {
    this.lang === "pl" ? this.lang = "en" : this.lang = "pl";
    this.LangSubject.next(this.lang);
    console.log(`Language set to ${this.lang}.`);
    return this.lang;
  }
}


