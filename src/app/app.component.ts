import { Component } from '@angular/core';
import {Lang} from "./lang/Interfaces/lang";

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
    // console.log(AppComponent.lang);
  }

  public static GetLang()
  {
    return this.lang;
  }
}
