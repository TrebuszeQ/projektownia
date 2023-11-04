import { Component } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
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
  constructor(route: ActivatedRoute, langService: LangService)
  {
    super(route,"about", langService);
    // if(this.langArr === null) this.setLangArr(this.lang);
  }
}
