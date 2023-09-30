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
import { BaseComponent } from '../base/base.component';


@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent 
extends BaseComponent 
implements OnInit 
{
  constructor(
    private sliderService: SliderService, langService: LangService) 
  {
    super(langService);
    SliderService.srvSlides().subscribe(
      (slidesSrvd: Slides[]) => this.slides = slidesSrvd);
  };
  
  readonly arrowL = faArrowRight;
  readonly arrowR = faArrowLeft;
  readonly play = faCaretSquareRight;
  public slides: Slides[] = []; 

  ngOnInit(): void {
    this.setLangArr(this.lang);
    this.callWorkerInit();
    this.callServiceSubscription();
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



