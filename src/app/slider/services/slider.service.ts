import { Injectable, OnInit } from '@angular/core';
// RxJS
import { Observable, Subject } from 'rxjs';
// interfaces, types
import { Slides } from '../interfaces/slides';
import { SliderMsg } from '../types/slider-msg';

@Injectable({
  providedIn: 'root'
})
export class SliderService implements OnInit
{
  static readonly slidClass: string = "sliderImg l8";
  private slidWPos: number =  0;
  readonly slidAmount: number = 1;
  private slidSpeed: number = 4500;
  private animSpeed: number = 2000;
  public slidSubject = new Subject<boolean>();
  private slidOn: boolean = true;
  private worker: any;
// todo slider service doesnt work well when speed is changed
  static slides: Slides[] = [
    { name: "slide1", url: "/assets/images/interior1.jpeg", cssId: "slide1", cssClass: SliderService.slidClass },
    { name: "slide2", url: "/assets/images/interior2.jpeg", cssId: "slide2", cssClass: SliderService.slidClass },
    { name: "slide3", url: "/assets/images/interior3.jpeg", cssId: "slide3", cssClass: SliderService.slidClass },
  ];

 ngOnInit() {
   this.subscribeSliderStatus();
 }

// serves slides array
  public static srvSlides(): Observable<Slides[]> {
    return new Observable<Slides[]>(
      (subscriber) => {
        subscriber.next(this.slides);
        subscriber.complete();
      }
    );
  }


  // returns slider wrapper as html element
  private getSlidW(): HTMLElement | null {
    return document.getElementById("sliderW");
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


  // posts message to the worker
  public messageWorker(msg: SliderMsg)
  {
    if(msg == "speed") this.worker.postMessage([msg, this.slidSpeed]);
    else if(msg == "off" && this.slidOn) this.changeSliderStatus(false);
    else this.worker.postMessage(msg);
  }


  // subscribes this.slidSubject to react to changes
  public subscribeSliderStatus()
  {
    this.slidSubject.subscribe({
      next: (status: boolean) => {
        this.slidOn = status;
        if(status) this.messageWorker("on")
        else if(!status) this.messageWorker("off");
      }
    });
  }


  // affects this.slidSubject subject to turn on/off auto sliding
  public changeSliderStatus(status: boolean) {
    this.slidSubject.next(status);
  }


  // changes slider wrapper translate or returns void if slider position value is null or ""
  private mvSlidW() {
    const compPos: string | null = this.getSlidWPos();
    if (compPos === null) {
      console.error("Slider wrapper translate value is not a string.");
    }
    else if (compPos != null) {
      const elem = this.getSlidW();
      let value: number = this.slidWPos + this.slidAmount;
      value > 2 ?  value = 0 : value;
      this.slidWPos = value;
      // console.log(this.slidWPos);
      this.animateSlide(value, elem!);
    }
  }


  // animates slide
  private animateSlide(pos: number, elem: HTMLElement) {
    let amount = pos * -100;
    elem!.animate(
      [
        {
          transform: `translateX(${amount}vw)`,
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
    }
    else console.error("Web workers are not supported in this environment. Slider won't be automatic.");

  }


  // casts string and modifies slider speed
  public changeSliderSpeed(value: string) {
    this.slidSpeed = parseInt(value);
    this.messageWorker("speed");
  }
}
