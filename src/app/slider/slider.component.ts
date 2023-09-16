import { Component, OnInit } from '@angular/core';
// services
import { SliderService } from './services/slider.service';
// interfaces
import { Slides } from './interfaces/slides';
// rxjs
import { Observable, of } from 'rxjs';
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
    // this.startSlider();
    this.callWorkInit(true);
  }


  // calls slider mover
  callSliderMover(val:number) {
    this.sliderService.mvSlidW(val);
  }


  // calls service to auto start slider
  startSlider() {
    // this.sliderService.autoSlide(true);
  }

  
  // calls service to spawn worker
  callWorkInit(on:boolean) {
    this.sliderService.spawnSliderWorker(on, 4000);
  }
};



