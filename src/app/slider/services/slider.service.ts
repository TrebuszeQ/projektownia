import { Injectable, OnInit } from '@angular/core';
// RxJS
import { Observable, Subject } from 'rxjs';
// interfaces
import { Slides } from '../interfaces/slides';

@Injectable({
  providedIn: 'root'
})
export class SliderService {

  readonly slidClass: string = "sliderImg l8";
  private slidWPos: number =  0;
  readonly slidAmount: number = -100;
  private slidSpeed: number = 3000;
  private animSpeed: number = 2000;
  public slidOn = new Subject<boolean>();
  private worker: any;

  readonly slides: Slides[] = [
    { name: "slide1", url: "/assets/images/interior1.jpeg", cssId: "slide1", cssClass: this.slidClass },
    { name: "slide2", url: "/assets/images/interior2.jpeg", cssId: "slide2", cssClass: this.slidClass },
    { name: "slide3", url: "/assets/images/interior3.jpeg", cssId: "slide3", cssClass: this.slidClass },
  ];


// serves slides array
  srvSlides(): Observable<Slides[]> {
    const observable = new Observable<Slides[]>(
      (subscriber) => {
        subscriber.next(this.slides);
        subscriber.complete();
      }
    )
    return observable;
  }


  // returns slider wrapper as html element
  async getSlidW(): Promise<HTMLElement | null> {
    return Promise.resolve(document.getElementById("sliderW"));
  }


  // returns slider wrapper computed style
  async getSlidWComp(elem: HTMLElement) {
    return window.getComputedStyle(elem).transform;
  }


  // gets slider wrapper transform translateX val or returns null if element is null
  async getSlidWPos(): Promise<string | null> {
    let elem: HTMLElement | null = await this.getSlidW();
    if (elem == null) {
      console.error("Slider wrapper element is null");
      return null;
    } else {
      return Promise.resolve(await this.getSlidWComp(elem));
    }
  }


  // Controls amount of slideX
  async validateSlidWPosVal(slidWPos: number): Promise<number> {
    if(this.slides.length > 0) {
      let slidWPosMin = this.slides.length * -100;
      switch(slidWPos) {
        case slidWPosMin:
          return 0;
        default:
          return slidWPos;
      }
    } else {
      return 0;
    }
  }


  // subscribes this.slidOn to react to changes
  subscribeSliderStatus() {
    this.slidOn.subscribe({ 
      next: (on: boolean) => {
        this.worker.postMessage([on, this.slidSpeed]);
      }
    });
  }


  // affects this.slidOn subject to turn on/off auto sliding
  changeSliderStatus(on: boolean) {
    this.slidOn.next(on);
  }


  // changes slider wrapper translate or returns void if slider position value is null or ""
  async mvSlidW() { 
    // console.log(this.slidWPos)
    const compPos: string | null = await this.getSlidWPos();
    if (compPos === null) {
      console.error("Slider wrapper translate value is not a string.");
    } 
    else if (compPos != null && this.slidOn) {
      const elem = await this.getSlidW();
      this.slidWPos;
      this.slidWPos += this.slidAmount;
      this.slidWPos = await this.validateSlidWPosVal(this.slidWPos);
      await this.animateSlide(this.slidWPos, elem!);
    } 
  }


  // animates slide
  async animateSlide(pos: number, elem: HTMLElement) {
    elem!.animate(
      [
        {
          transform: `translateX(${pos}vw)`,
          easing: "ease-out",
        }
      ],
      {
        fill: "forwards",
        duration: this.animSpeed,
      });
  }


  // initiates worker
  spawnSliderWorker() {
    if (typeof Worker !== "undefined") {
      const worker = new Worker(new URL("src/app/slider/workers/slider.worker.ts",
      import.meta.url));
      this.worker = worker;
      worker.onmessage = () => {
        this.mvSlidW();
      };
      worker.postMessage([this.slidOn, this.slidSpeed]);
    } 
    else {
      console.error("Web workers are not supported in this environment. Slider won't be automatic.");
    }
  
  }
  
}
