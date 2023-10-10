import { Component } from '@angular/core';
// classes
import { LangUtilities } from '../lang/classes/lang-uti';
// services
import { LangService } from '../lang/lang.service';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent extends LangUtilities
{
  constructor(private langService: LangService)
  {
    super("about")
    this.setLangArr();
    console.log(this.langArr);
    console.log(this.lang);
  }
}
