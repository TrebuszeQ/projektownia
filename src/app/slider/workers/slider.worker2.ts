type SliderMsg = "off" | "sleep" | "speed";  

class SliderWorker2 
{
  public static speed: number = 4500;
  private static renewSpeed: number = 9000 + this.speed;
  private static intervalAutoActive: boolean = false;
  private static intervalAuto = setInterval(() => null);
  private static intervalRenew = setInterval(() => null);
  
  constructor() 
  {
    // console.log("constructor");
    SliderWorker2.UpdatePreviousInstances();
    SliderWorker2.ClearRenew();
    SliderWorker2.UpdatePreviousInstances();
  }

  // sends message to service
  private static SendMessage(on: boolean) {
    // console.log(speed);
    postMessage(on);
  }


  // clears auto slider indefinitely
  public static ClearAuto()
  {
    clearInterval(SliderWorker2.intervalAuto);
    SliderWorker2.intervalAutoActive = false;
  }


  public static ClearRenew()
  {
    clearInterval(SliderWorker2.intervalRenew);
  }


  // clears previous instance of interval and sets boolean checkpoints to false
  public static UpdatePreviousInstances() 
  {
    clearInterval(SliderWorker2.intervalAuto);
    clearInterval(SliderWorker2.intervalRenew);
    SliderWorker2.intervalAutoActive = false; 
    SliderWorker2.CreateNewAutoInstance();
    SliderWorker2.CreateNewRenewInstance();
    // console.log("created");
  }


  // creates new instance of auto interval and calls to clear renew interval
  private static CreateNewAutoInstance()
  {
    if(SliderWorker2.intervalAutoActive == false) 
    {
      SliderWorker2.intervalAutoActive = true;
      SliderWorker2.ClearRenew();
      SliderWorker2.intervalAuto = setInterval(SliderWorker2.IntervalHandlerAuto, SliderWorker2.speed);
    }
  }


  // creates new instance of renew interval if auto is inactive
  private static CreateNewRenewInstance()
  {
    if(SliderWorker2.intervalAutoActive == false)
    {
      SliderWorker2.intervalRenew = setInterval(SliderWorker2.IntervalHandlerRenew, SliderWorker2.renewSpeed);
    }
  }
  
  
  // posts message to slider service
  private static IntervalHandlerAuto() 
  {
    if(SliderWorker2.intervalAutoActive == false) SliderWorker2.intervalAutoActive = true;
    SliderWorker2.SendMessage(true);
  }


  // calls to create new renew instance if auto is not active
  private static IntervalHandlerRenew() {
    if(SliderWorker2.intervalAutoActive == false) SliderWorker2.CreateNewAutoInstance()
  }


  // if message is false it calls to clear auto interval and calls to createrenew interval
  public static SlideInterface(data: any) 
  {
    switch(data)
    {
      case "off":
        SliderWorker2.ClearAuto;
        SliderWorker2.ClearRenew;
        break;
      case "sleep":
        SliderWorker2.ClearAuto();
        SliderWorker2.SendMessage(false);
        SliderWorker2.CreateNewRenewInstance();
        break;
      case "speed":
        SliderWorker2.speed = data[1];
        SliderWorker2.UpdatePreviousInstances();
        break;  
    }
  }
}

const workerClass2 = new SliderWorker2();

addEventListener('message', ({ data }) => {
  // const response = `worker response to ${data}`;
  // console.log(response)
  SliderWorker2.SlideInterface(data);
});