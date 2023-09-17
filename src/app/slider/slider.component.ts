import { Component, OnInit } from '@angular/core';
// services
import { SliderService } from './services/slider.service';
// interfaces
import { Slides } from './interfaces/slides';
// fa
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

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
  readonly arrowL = faArrowRight;
  readonly arrowR = faArrowLeft;
  slides: Slides[] = []; 

  
  ngOnInit(): void {
    this.callWorkInit();
  }


  // calls slider mover
  callSliderMover() {
    this.sliderService.slidOn.next(false);
    this.sliderService.mvSlidW();
  }

  
  // calls service to spawn worker
  callWorkInit() {
    this.sliderService.spawnSliderWorker();
  }
};



