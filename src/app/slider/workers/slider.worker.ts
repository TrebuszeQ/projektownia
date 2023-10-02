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
  private static intervalAuto = setInterval(() => null);
  private static intervalRenew = setInterval(() => null);
  
  constructor() 
  {
    // console.log("constructor");
    SliderWorker.UpdatePreviousInstances();
    SliderWorker.ClearRenew();
    SliderWorker.UpdatePreviousInstances();
  }

  // sends message to service
  private static SendMessage(on: boolean) {
    // console.log(speed);
    postMessage(on);
  }


  // clears auto slider indefinitely
  public static ClearAuto()
  {
    clearInterval(SliderWorker.intervalAuto);
    SliderWorker.intervalAutoActive = false;
  }


  public static ClearRenew()
  {
    clearInterval(SliderWorker.intervalRenew);
  }


  // clears previous instance of interval and sets boolean checkpoints to false
  public static UpdatePreviousInstances() 
  {
    clearInterval(SliderWorker.intervalAuto);
    clearInterval(SliderWorker.intervalRenew);
    SliderWorker.intervalAutoActive = false; 
    SliderWorker.CreateNewAutoInstance();
    SliderWorker.CreateNewRenewInstance();
    // console.log("created");
  }


  // creates new instance of auto interval and calls to clear renew interval
  private static CreateNewAutoInstance()
  {
    if(SliderWorker.intervalAutoActive == false) 
    {
      SliderWorker.intervalAutoActive = true;
      SliderWorker.ClearRenew();
      SliderWorker.intervalAuto = setInterval(SliderWorker.IntervalHandlerAuto, SliderWorker.speed);
    }
  }


  // creates new instance of renew interval if auto is inactive
  private static CreateNewRenewInstance()
  {
    if(SliderWorker.intervalAutoActive == false)
    {
      SliderWorker.intervalRenew = setInterval(SliderWorker.IntervalHandlerRenew, SliderWorker.renewSpeed);
    }
  }
  
  
  // posts message to slider service
  private static IntervalHandlerAuto() 
  {
    if(SliderWorker.intervalAutoActive == false) SliderWorker.intervalAutoActive = true;
    SliderWorker.SendMessage(true);
  }


  // calls to create new renew instance if auto is not active
  private static IntervalHandlerRenew() {
    if(SliderWorker.intervalAutoActive == false) SliderWorker.CreateNewAutoInstance()
  }


  // if message is false it calls to clear auto interval and calls to createrenew interval
  public static AutoSlide(on: boolean) 
  {
    // console.log("autoslide")
    if(!on) 
    {
      // console.log("cleared");
      SliderWorker.ClearAuto();
      SliderWorker.SendMessage(false);
      SliderWorker.CreateNewRenewInstance();
    }
  }
}

const workerClass = new SliderWorker();

addEventListener('message', ({ data }) => {
  // const response = `worker response to ${data}`;
  // console.log(response);
  if(SliderWorker.speed != data[1]) 
  {
    SliderWorker.speed = data[1];
    SliderWorker.UpdatePreviousInstances();
  }
  SliderWorker.AutoSlide(data[0]);
});