import { Injectable } from '@angular/core';
// RxJS
import { Observable } from 'rxjs';
// interfaces
import { Slides } from '../interfaces/slides';

@Injectable({
  providedIn: 'root'
})
export class SliderService {

  readonly slidClass: string = "sliderImg l8";
  slidWPos: number =  0;

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
        case 0:
          return slidWPosMin;
        default:
          return slidWPos;
      }
    } else {
      return 0;
    }
  }


  // changes slider wrapper translate or returns void if slider position value is null or ""
  async mvSlidW(val: number) { 
    // console.log(this.slidWPos)
    const compPos: string | null = await this.getSlidWPos();
    if (compPos === null) {
      console.error("Slider wrapper translate value is not a string.");
    } else {
      let elem = await this.getSlidW();
      this.slidWPos += val;
      let slidWPos: number = await this.validateSlidWPosVal(this.slidWPos);
      this.slidWPos = slidWPos;
      elem!.animate(
        [
          {
            transform: `translateX(${slidWPos}vw)`,
            easing: "ease-out",
          }
        ],
        {
          fill: "forwards",
          duration: 200,
        });
    } 
  }

    // initiates worker
    spawnSliderWorker(on:boolean, speed: number) {
      if (typeof Worker !== "undefined") {
        const worker = new Worker(new URL("src/app/slider/workers/slider.worker.ts",
        import.meta.url));
        worker.onmessage = ({ data}) => {
          this.reactToMsg(data);
        };
        worker.postMessage([on, speed]);
      } else {
        console.error("Web workers are not supported in this environment. Slider won't be automatic.");
      }
    }

    // takes actions depending on worker response
    reactToMsg(on: boolean) {
      switch(on) {
        case true:
          this.mvSlidW(-100);
          break;
        case false:
          break;
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
