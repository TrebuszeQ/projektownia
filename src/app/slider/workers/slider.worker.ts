/// <reference lib="webworker" />
let speed: number = 4500;
let renewSpeed: number = 9000 + speed;
let cleared: boolean = false;
let interval2Instance: boolean = false;
let intervalRenewInstance: boolean = false;

addEventListener('message', ({ data }) => {
  // const response = `worker response to ${data}`;
  // console.log(response);
  autoSlide(data[0]);
  speed = data[1];
});

let interval2 = null;
let intervalRenew = null;


// controls if there is any other instance of interval and clears it
function interval2InstanceController()
{
  if(interval2Instance) 
  {
    clearInterval(interval2!);
    interval2Instance = false;
  }
  interval2Instance = true;
  interval2 = setInterval(intervalHandlerSlide, speed);
}


// controls if there is any other instance of interval and clears it
function intervalRenewInstanceController()
{
  
  if(intervalRenewInstance) 
  {
    clearInterval(intervalRenew!);
    interval2Instance = false;
  }
  // console.log("renewed");
  intervalRenewInstance = true;
  intervalRenew = setInterval(intervalHandlerRenew, renewSpeed);
}


// sends message to service
function sendMessage(on: boolean) {
  // console.log(speed);
  postMessage(on);
}


// posts message to slider service
function intervalHandlerSlide() {
  cleared = false;
  sendMessage(true);
}


// renews intervalHandler for renewing
function intervalHandlerRenew() {
  // console.log("tick");
  if(cleared) {
    // console.log("Slider renewed");
    cleared = false;
    intervalRenewInstanceController();
    interval2InstanceController();
  }
}


// controls auto sliding
function autoSlide(on: boolean) {
  switch(on) {
    case false:
      // console.log("cleared");
      clearInterval(interval2!);
      cleared = true;
      sendMessage(false);
      break;

    case true:
      interval2InstanceController();
      intervalRenewInstanceController();
      break;
  }
}