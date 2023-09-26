import { Component, OnInit } from '@angular/core';
// services
import { SliderService } from './services/slider.service';
// interfaces
import { Slides } from './interfaces/slides';
// fa
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight, faCaretSquareRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
  constructor(private sliderService: SliderService) {
    SliderService.srvSlides().subscribe(
    (slidesSrvd: Slides[]) => this.slides = slidesSrvd);
  };
  readonly arrowL = faArrowRight;
  readonly arrowR = faArrowLeft;
  readonly play = faCaretSquareRight;
  public slides: Slides[] = []; 

  
  ngOnInit(): void {
    this.callWorkerInit();
    this.callServiceSubscription();
  }


  // calls slider mover
  callSliderMover() {
    this.callSliderStatus(false);
  }

  
  // calls service to spawn worker
  callWorkerInit() {
    this.sliderService.spawnSliderWorker();
  }


  // calls service to subscribe sliderOn status
  callServiceSubscription() {
    this.sliderService.subscribeSliderStatus();
  }


  // calls service to turn slider on/off
  callSliderStatus(on: boolean) {
    this.sliderService.changeSliderStatus(on);
  }


  // hides or shows speed button 
  controlSpeedButton(on: boolean) {
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
  updateLocalSpeed(event: Event) {
    const element = event.target;
    const element2 = element as HTMLInputElement;
    this.callSliderSpeed(element2.value);
  }
  

  // calls service to change sliding speed
  callSliderSpeed(value: string) {
    this.sliderService.changeSliderSpeed(value);
  }
};



