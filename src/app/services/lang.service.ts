import { Injectable } from '@angular/core';
// rxjs
import {Subject} from 'rxjs';
// interfaces, types, etc
import { LangEntry } from '../interfaces/lang-entry';
import {Lang} from "../interfaces/lang";
import {LangUtilities} from "../classes/lang-uti";
import {AppComponent} from "../app.component";

@Injectable({
  providedIn: 'root'
})
export class LangService {
  protected lang: Lang;
  public LangSubject: Subject<Lang>= new Subject();
  protected langMap: Map <string, LangEntry> = new Map();


  public constructor()
  {
    console.log("lang.service");
    this.lang = AppComponent.GetLang();
    this.LangSubject.next(this.lang);
    // LangService.setLang();
  }


  protected langMapGetter()
  {
    if(this.langMap.size == 0) this.PopulateMap();
    return this.langMap;
  }

  protected PopulateMap()
  {
    this.langMap.set("home", {
      compName: "home",
      contentPl: null,
      contentEn: null
    });

    this.langMap.set("ui", {
      compName: "ui",
      contentPl: [
        "Strona główna",
        "strona_glowna",
        "O mnie",
        "o_mnie",
        "przycisk3",
        "link3",
        "przycisk4",
        "link4",
        "przycisk5",
        "link5",
        "przycisk6",
        "link6",
        "przycisk7",
        "link7",
        "przycisk8",
        "link8",
      ],
      contentEn: [
        "Home",
        "home",
        "About",
        "about",
        "button3",
        "url3",
        "button4",
        "url4",
        "button5",
        "url5",
        "button6",
        "url6",
        "button7",
        "url7",
        "button8",
        "url8",
      ],
    });

    this.langMap.set("slider", {
      compName: "slider",
      contentPl: ["szybkość"],
      contentEn: ["speed"],
    });

    this.langMap.set("about", {
      compName: "about",
      contentPl: ["O mnie", `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam a ullamcorper lacus. Aliquam feugiat et ipsum id venenatis. Suspendisse potenti. Aenean ornare, elit eu tempus maximus, purus neque tristique nunc, et auctor leo tortor ut purus. Donec cursus, lectus vitae vestibulum varius, mi nunc convallis nisi, non euismod ipsum nisl at libero. Vestibulum sollicitudin quis nisi in scelerisque. Mauris nec tristique lectus. Vivamus mattis, tellus in facilisis porttitor, orci orci vulputate elit, vitae ultricies enim enim vitae ligula. Nunc quis aliquam urna, non venenatis erat. Vivamus porttitor diam id suscipit placerat. Sed maximus, nunc lacinia commodo viverra, nunc nulla vulputate lectus, a aliquam mauris tellus vitae ligula.`],
      contentEn: ["About me", `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam a ullamcorper lacus. Aliquam feugiat et ipsum id venenatis. Suspendisse potenti. Aenean ornare, elit eu tempus maximus, purus neque tristique nunc, et auctor leo tortor ut purus. Donec cursus, lectus vitae vestibulum varius, mi nunc convallis nisi, non euismod ipsum nisl at libero. Vestibulum sollicitudin quis nisi in scelerisque. Mauris nec tristique lectus. Vivamus mattis, tellus in facilisis porttitor, orci orci vulputate elit, vitae ultricies enim enim vitae ligula. Nunc quis aliquam urna, non venenatis erat. Vivamus porttitor diam id suscipit placerat. Sed maximus, nunc lacinia commodo viverra, nunc nulla vulputate lectus, a aliquam mauris tellus vitae ligula.`],
    });
  }

  public SetLang() {
    this.lang == "pl" ? this.lang = "en" : this.lang = "pl";
    this.LangSubject.next(this.lang);
    console.log(`Language set to ${this.lang}.`);
  }

  public GetLang() {
    return this.lang;
  }

  public fetchLangEntry(key: string)
  {
    let truth = this.langMapGetter().has(key);
    return truth ? this.langMap.get(key) : truth;
  }
}