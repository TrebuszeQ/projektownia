// /// <reference lib="webworker" />
// let speed: number = 4500;
// let renewSpeed: number = 9000 + speed;
// let cleared: boolean = false;
// let interval2Instance: boolean = false;
// let intervalRenewInstance: boolean = false;

// addEventListener('message', ({ data }) => {
//   // const response = `worker response to ${data}`;
//   // console.log(response);
//   AutoSlide(data[0]);
//   speed = data[1];
// });

// let interval2 = null;
// let intervalRenew = null;


// // controls if there is any other instance of interval and clears it
// function interval2InstanceController()
// {
//   if(interval2Instance) 
//   {
//     clearInterval(interval2!);
//     interval2Instance = false;
//   }
//   interval2Instance = true;
//   interval2 = setInterval(intervalHandlerSlide, speed);
// }


// // controls if there is any other instance of interval and clears it
// function intervalRenewInstanceController()
// {
  
//   if(intervalRenewInstance) 
//   {
//     clearInterval(intervalRenew!);
//     interval2Instance = false;
//   }
//   // console.log("renewed");
//   intervalRenewInstance = true;
//   intervalRenew = setInterval(IntervalHandlerRenew, renewSpeed);
// }


// // sends message to service
// function sendMessage(on: boolean) {
//   // console.log(speed);
//   postMessage(on);
// }


// // posts message to slider service
// function intervalHandlerSlide() {
//   cleared = false;
//   sendMessage(true);
// }


// // renews intervalHandler for renewing
// function IntervalHandlerRenew() {
//   // console.log("tick");
//   if(cleared) {
//     // console.log("Slider renewed");
//     cleared = false;
//     intervalRenewInstanceController();
//     interval2InstanceController();
//   }
// }


// // controls auto sliding
// function AutoSlide(on: boolean) {
//   switch(on) {
//     case false:
//       // console.log("cleared");
//       clearInterval(interval2!);
//       cleared = true;
//       sendMessage(false);
//       break;

//     case true:
//       interval2InstanceController();
//       intervalRenewInstanceController();
//       break;
//   }

class SliderWorker 
{
  public static speed: number = 4500;
  private static renewSpeed: number = 9000 + this.speed;
  private static intervalAutoActive: boolean = false;
  private static intervalRenewActive: boolean = false;
  private static intervalAuto = setInterval(() => null);
  private static intervalRenew = setInterval(() => null);
  
  constructor() 
  {
    
  }

  // sends message to service
  private static SendMessage(on: boolean) {
    // console.log(speed);
    postMessage(on);
  }


  // doesn't let another instance of the interval to be running by clearing previous interval.
  private static IntervalInstanceController(interval: NodeJS.Timeout)
  {
    if(SliderWorker.intervalAutoActive && interval == SliderWorker.intervalAuto) 
    {
      clearInterval(interval);
      SliderWorker.intervalAutoActive = false;
    }
    else if(SliderWorker.intervalRenewActive && interval == SliderWorker.intervalRenew)
    { 
      clearInterval(interval);
      SliderWorker.intervalRenewActive = false;    
    }
    else if(SliderWorker.intervalAutoActive == false && interval == SliderWorker.intervalAuto)
    {
      SliderWorker.intervalAuto = setInterval(SliderWorker.IntervalHandlerAuto, SliderWorker.speed);
    }
    else if(SliderWorker.intervalRenewActive == false && interval == SliderWorker.intervalRenew)
    {
      SliderWorker.intervalRenew = setInterval(SliderWorker.IntervalHandlerRenew, SliderWorker.renewSpeed);
    }
  }
  
  
  // posts message to slider service
  private static IntervalHandlerAuto() 
  {
    console.log("lol");
    if(SliderWorker.intervalAutoActive == false) SliderWorker.intervalAutoActive = true;
    SliderWorker.SendMessage(true);
  }

  // renews intervalHandler for renewing
  private static IntervalHandlerRenew() {
  // console.log("tick");
    if(SliderWorker.intervalRenewActive == false) {
      // console.log("Slider renewed");
      SliderWorker.intervalRenewActive = true;
      SliderWorker.IntervalInstanceController(SliderWorker.intervalRenew);
      SliderWorker.IntervalInstanceController(SliderWorker.intervalAuto);
    }
  }

  // controls auto sliding
  public static AutoSlide(on: boolean) 
  {
    if(!on) 
    {
      // console.log("cleared");
      clearInterval(SliderWorker.intervalAuto);
      SliderWorker.SendMessage(false);
    }
    else if(on)
    {
      SliderWorker.IntervalInstanceController(SliderWorker.intervalRenew);
      SliderWorker.IntervalInstanceController(SliderWorker.intervalAuto);
    }  
  }
}

addEventListener('message', ({ data }) => {
  // const response = `worker response to ${data}`;
  // console.log(response);
  SliderWorker.AutoSlide(data[0]);
  if(SliderWorker.speed != data[1]) SliderWorker.speed = data[1];
});