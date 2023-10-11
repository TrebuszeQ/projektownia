import { Component } from '@angular/core';
import {LangUtilities} from "./lang/classes/lang-uti";
import {LangService} from "./lang/lang.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent
{
  title = 'projektownia';
  lol: string;
  constructor()
  {
    this.lol = "lol";
  }

}
