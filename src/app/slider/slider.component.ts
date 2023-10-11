import { Component, OnInit } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
// services
import { SliderService } from './services/slider.service';
// interfaces, types
import { Slides } from './interfaces/slides';
import { SliderMsg } from './types/slider-msg';
// fa
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight, faCaretSquareRight } from '@fortawesome/free-solid-svg-icons';
import { LangUtilities } from '../lang/classes/lang-uti';


@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent
extends LangUtilities
implements OnInit
{
  readonly arrowL = faArrowRight;
  readonly arrowR = faArrowLeft;
  readonly play = faCaretSquareRight;
  public slides: Slides[] = [];
  private on: boolean = true;

  constructor(private sliderService: SliderService)
  {
    super("slider");
    this.setLangArr();
    SliderService.srvSlides().subscribe(
      (slidesSrvd: Slides[]) => this.slides = slidesSrvd);
  };


  ngOnInit(): void {
    this.setLangArr();
    this.callWorkerInit();
    this.callServiceSubscription();
  }


  // calls service to spawn worker
  private callWorkerInit() {
    this.sliderService.spawnSliderWorker();
  }


  // calls service to subscribe sliderOn status
  private callServiceSubscription() {
    this.sliderService.subscribeSliderStatus();
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


  // calls slider service to send stop message to stop auto sliding indefinitely
  public CallToMsgSlider(msg: SliderMsg)
  {
    this.sliderService.messageWorker(msg);
  }


  public TurnOffSlider()
  {
    this.on = !this.on;
    if(this.on) this.CallToMsgSlider("off");
    else this.CallToMsgSlider("on");
  }
}



