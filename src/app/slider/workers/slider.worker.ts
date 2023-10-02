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
  else if(data[0] == null) 
  {
    SliderWorker.ClearRenew();
    SliderWorker.ClearAuto();
  }
  SliderWorker.AutoSlide(data[0]);
});