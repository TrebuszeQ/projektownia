import { Component, OnInit } from '@angular/core';
// services
import { SliderService } from './services/slider.service';
import { LangService } from '../lang/lang.service';
// interfaces
import { Slides } from './interfaces/slides';
import { LangEntry } from '../lang/Interfaces/lang-entry';

// fa
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight, faCaretSquareRight } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
  constructor(private sliderService: SliderService, private langService: LangService) {
    SliderService.srvSlides().subscribe(
    (slidesSrvd: Slides[]) => this.slides = slidesSrvd);
    
    langService.langSub.subscribe( {
      next: (lang: string) => { 
        if(this.lang != lang) {
          this.setLangArr(lang);
          this.lang = lang;
        };
      }
    });

    const langEntry = this.langService.fetchLangEntry("slider");
    if(langEntry != null) this.langEntry = langEntry;
    
  };
  readonly arrowL = faArrowRight;
  readonly arrowR = faArrowLeft;
  readonly play = faCaretSquareRight;
  public slides: Slides[] = []; 
  private lang = "pl" || "en";
  private readonly langEntry?: LangEntry | null = null;
  public langArr?: string[] | null = null;
  

  ngOnInit(): void {
    this.setLangArr(this.lang);
    this.callWorkerInit();
    this.callServiceSubscription();
  }


  // fetches lang entry from lang service
  private setLangArr(lang: string) {
    if(lang = "pl") this.langArr = this.langEntry!.contentPl;
    else if(lang = "en") this.langArr = this.langEntry!.contentEn;
    console.log(lang);
    console.log(this.langEntry);
    console.log(this.langArr);
  }


  // calls slider mover
  public callSliderMover() {
    this.callSliderStatus(false);
  }

  
  // calls service to spawn worker
  private callWorkerInit() {
    this.sliderService.spawnSliderWorker();
  }


  // calls service to subscribe sliderOn status
  private callServiceSubscription() {
    this.sliderService.subscribeSliderStatus();
  }


  // calls service to turn slider on/off
  private callSliderStatus(on: boolean) {
    this.sliderService.changeSliderStatus(on);
  }


  // hides or shows speed button 
  public controlSpeedButton(on: boolean) {
    const button = document.getElementById("speedButton");
    if(!on) {
      button!.animate(
        [
          {
            visibility: "hidden",
            easing: "ease"
          }
        ],
        {
          fill: "forwards",
          duration: 1,
        });
    }
    else {
      button!.animate(
        [
          {
            visibility: "visible",
            easing: "ease"
          }
        ],
        {
          fill: "forwards",
          duration: 1500,
        });
    }
    
  }


  // updates local speed
  public updateLocalSpeed(event: Event) {
    const element = event.target;
    const element2 = element as HTMLInputElement;
    this.callSliderSpeed(element2.value);
  }
  

  // calls service to change sliding speed
  public callSliderSpeed(value: string) {
    this.sliderService.changeSliderSpeed(value);
  }
};



