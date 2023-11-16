type SliderMsg = "off" | "sleep" | "speed";
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
    // ?
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
    if(!SliderWorker.intervalAutoActive)
    {
      SliderWorker.intervalAutoActive = true;
      SliderWorker.ClearRenew();
      SliderWorker.intervalAuto = setInterval(SliderWorker.IntervalHandlerAuto, SliderWorker.speed);
    }
  }


  // creates new instance of renew interval if auto is inactive
  private static CreateNewRenewInstance()
  {
    if(!SliderWorker.intervalAutoActive)
    {
      SliderWorker.intervalRenew = setInterval(SliderWorker.IntervalHandlerRenew, SliderWorker.renewSpeed);
    }
  }


  // posts message to slider service
  private static IntervalHandlerAuto()
  {
    if(!SliderWorker.intervalAutoActive) SliderWorker.intervalAutoActive = true;
    SliderWorker.SendMessage(true);
  }


  // calls to create new renew instance if auto is not active
  private static IntervalHandlerRenew() {
    if(!SliderWorker.intervalAutoActive) SliderWorker.CreateNewAutoInstance()
  }


  // if message is false it calls to clear auto interval and calls to createrenew interval
  public static SlideInterface(data: any)
  {
    console.log(data);
    switch(data)
    {
      case "on":
        SliderWorker.UpdatePreviousInstances();
        break;
      case "off":
        SliderWorker.ClearAuto();
        SliderWorker.ClearRenew();
        break;
      case "sleep":
        SliderWorker.ClearAuto();
        SliderWorker.SendMessage(false);
        SliderWorker.CreateNewRenewInstance();
        break;
      case "speed":
        SliderWorker.speed = data[1];
        SliderWorker.UpdatePreviousInstances();
        break;
    }
  }
}

const workerClass = new SliderWorker();

addEventListener('message', ({ data }) => {
  // const response = `worker response to ${data}`;
  // console.log(response)
  SliderWorker.SlideInterface(data);
});
