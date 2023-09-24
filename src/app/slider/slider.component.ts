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
    this.sliderService.srvSlides().subscribe(
    (slidesSrvd: Slides[]) => this.slides = slidesSrvd);
  };
  public rangeV: number = 3000;
  readonly arrowL = faArrowRight;
  readonly arrowR = faArrowLeft;
  readonly play = faCaretSquareRight;
  public slides: Slides[] = []; 
  public sliderButtOn: boolean = true;

  
  ngOnInit(): void {
    this.callWorkerInit();
    this.callServiceSubscription();
  }


  // calls slider mover
  callSliderMover() {
    this.callSliderStatus(false);
    this.sliderService.mvSlidW();
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


  // updates local speed
  updateLocalSpeed(value: number) {
    this.rangeV = value;
  }
  

  // calls service to change slider speed
  callSliderSpeed() {
    console.log();
  }
};



