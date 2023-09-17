import { Injectable, OnInit } from '@angular/core';
// RxJS
import { Observable, Subject } from 'rxjs';
// interfaces
import { Slides } from '../interfaces/slides';

@Injectable({
  providedIn: 'root'
})
export class SliderService implements OnInit{

  readonly slidClass: string = "sliderImg l8";
  slidWPos: number =  0;
  slidAmount: number = -100;
  slidSpeed: number = 3000;
  animSpeed: number = 2000;
  slidOn = new Subject<boolean>;
  worker: any;

  readonly slides: Slides[] = [
    { name: "slide1", url: "/assets/images/interior1.jpeg", cssId: "slide1", cssClass: this.slidClass },
    { name: "slide2", url: "/assets/images/interior2.jpeg", cssId: "slide2", cssClass: this.slidClass },
    { name: "slide3", url: "/assets/images/interior3.jpeg", cssId: "slide3", cssClass: this.slidClass },
  ];

  ngOnInit(): void {
    this.subscribeSlider()
  }

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

// here
  // Controls amount of slideX
  async validateSlidWPosVal(slidWPos: number): Promise<number> {
    if(this.slides.length > 0) {
      let slidWPosMin = this.slides.length * -100;
      console.log(slidWPosMin);
      switch(slidWPos) {
        case slidWPosMin:
          return 0;
        case 0:
          return slidWPosMin;
        default:
          return slidWPos;
      }
    } else {
      return 0;
    }
  }


  subscribeSlider() {
    this.slidOn.subscribe(on => { 
      if(!on) this.worker.postMessage([false, this.slidSpeed]);
    })
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
      this.slidWPos += this.slidAmount;
      const slidWPos: number = await this.validateSlidWPosVal(this.slidWPos);
      console.log(slidWPos);
      await this.animateSlide(slidWPos, elem!);
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
    } else {
      console.error("Web workers are not supported in this environment. Slider won't be automatic.");
    }
  
  }

  // turns auto sliding on/off
  // async autoSlide(on: boolean) {
  //   // console.log("called");
  //   let interv = () => setInterval( 
  //     () => {
  //       this.mvSlidW(-100);
  //   }, 3000);
  //   if (on) interv();
  //   else if (!on) {
  //     console.log("cleared");
  //     clearInterval(interv());
  //   }
  // }


  // initiates slider worker
  
}
