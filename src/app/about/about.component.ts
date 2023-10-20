import { Component } from '@angular/core';
// classes
import { LangUtilities } from '../lang/classes/lang-uti';
import {ActivatedRoute} from "@angular/router";
// services


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent extends LangUtilities
{
  constructor(private route: ActivatedRoute)
  {
    super("about", route);
    // if(this.langArr === null) this.setLangArr(this.lang);
  }
}
