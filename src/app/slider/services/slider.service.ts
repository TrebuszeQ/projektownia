import { Injectable, OnInit } from '@angular/core';
// RxJS
import { Observable, Subject } from 'rxjs';
// interfaces
import { Slides } from '../interfaces/slides';

@Injectable({
  providedIn: 'root'
})
export class SliderService {

  static readonly slidClass: string = "sliderImg l8";
  private slidWPos: number =  0;
  readonly slidAmount: number = -100;
  private slidSpeed: number = 3000;
  private animSpeed: number = 2000;
  public slidSubject = new Subject<boolean>();
  private slidOn: boolean = true;
  private worker: any;

  static slides: Slides[] = [
    { name: "slide1", url: "/assets/images/interior1.jpeg", cssId: "slide1", cssClass: SliderService.slidClass },
    { name: "slide2", url: "/assets/images/interior2.jpeg", cssId: "slide2", cssClass: SliderService.slidClass },
    { name: "slide3", url: "/assets/images/interior3.jpeg", cssId: "slide3", cssClass: SliderService.slidClass },
  ];
// serves slides array
  public static srvSlides(): Observable<Slides[]> {
    const observable = new Observable<Slides[]>(
      (subscriber) => {
        subscriber.next(this.slides);
        subscriber.complete();
      }
    )
    return observable;
  }


  // returns slider wrapper as html element
  private getSlidW(): HTMLElement | null {
    const element = document.getElementById("sliderW");
    return element;
  }


  // returns slider wrapper computed style
  private getSlidWComp(elem: HTMLElement) {
    return window.getComputedStyle(elem).transform;
  }


  // gets slider wrapper transform translateX val or returns null if element is null
  private getSlidWPos(): string | null {
    const elem: HTMLElement | null = this.getSlidW();
    if (elem == null) {
      console.error("Slider wrapper element is null");
      return null;
    } else {
      return this.getSlidWComp(elem);
    }
  }


  // Controls amount of slideX
  private validateSlidWPosVal(): number {
    const slidWPos = this.slidWPos;
    const slidWPosMin = SliderService.slides.length * -100;
    if(SliderService.slides.length == 0 || slidWPos == slidWPosMin || slidWPos < slidWPos) return 0;
    else return slidWPos;
  }

  // posts message to the worker 
  private messageWorker(on: boolean) {
    this.worker.postMessage([on, this.slidSpeed]);
  }


  // subscribes this.slidSubject to react to changes
  public subscribeSliderStatus() {
    this.slidSubject.subscribe({ 
      next: (on: boolean) => {
        this.slidOn = on;
        this.messageWorker(this.slidOn);
      }
    });
  }


  // affects this.slidSubject subject to turn on/off auto sliding
  public changeSliderStatus(on: boolean) {
    this.slidSubject.next(on);
  }


  // changes slider wrapper translate or returns void if slider position value is null or ""
  private mvSlidW() { 
    // console.log(this.slidWPos)
    const compPos: string | null = this.getSlidWPos();
    if (compPos === null) {
      console.error("Slider wrapper translate value is not a string.");
    } 
    else if (compPos != null && this.slidOn) {
      const elem = this.getSlidW();
      let value = this.slidWPos + this.slidAmount;
      this.slidWPos = value;
      value = this.validateSlidWPosVal();
      this.slidWPos = value;
      this.animateSlide(value, elem!);
    } 
  }


  // animates slide
  private animateSlide(pos: number, elem: HTMLElement) {
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
  public spawnSliderWorker() {
    if (typeof Worker !== "undefined") {
      const worker = new Worker(new URL("src/app/slider/workers/slider.worker.ts",
      import.meta.url));
      this.worker = worker;
      worker.onmessage = () => {
        this.mvSlidW();
      };
      this.messageWorker(this.slidOn);
    } 
    else {
      console.error("Web workers are not supported in this environment. Slider won't be automatic.");
    }
  
  }
  

  // casts string and modifies slider speed
  changeSliderSpeed(value: string) {
    let speed = parseInt(value);
    this.slidSpeed = speed;
    this.messageWorker(this.slidOn);
  }
}
