import { Component } from '@angular/core';
// classes
import { LangUtilities } from '../classes/lang-uti';
// services
import {LangService} from "../services/lang.service";


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent extends LangUtilities
{
  constructor(langService: LangService)
  {
    super("about", langService);
    // if(this.langArr === null) this.setLangArr(this.lang);
  }
}
