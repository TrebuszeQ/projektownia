/// <reference lib="webworker" />
let speed: number = 3000;
let renewSpeed: number = 9000 + speed;
let cleared: boolean = false;

addEventListener('message', ({ data }) => {
  // const response = `worker response to ${data}`;
  // console.log(response);
  autoSlide(data[0]);
  speed = data[1];
});


let interval2 = setInterval(intervalHandlerSlide, speed);
let intervalRenew = setInterval(intervalHandlerRenew, renewSpeed);


// sends message to service
function sendMessage(on: Boolean) {
  console.log("lol");
  postMessage(on);
}


// posts message to slider service
function intervalHandlerSlide() {
  cleared = false;
  sendMessage(true);
}


// renews intervalHandler for renewing
function intervalHandlerRenew() {
  if(cleared) {
    // console.log("Slider renewed");
    interval2 = setInterval(intervalHandlerSlide, speed);
  }
}


// controls auto sliding
function autoSlide(on: boolean) {
  switch(on) {
    case false:
      // console.log("cleared");
      clearInterval(interval2);
      cleared = true;
      sendMessage(false);
      break;

    case true:
      interval2 = setInterval(intervalHandlerSlide, speed);
      break;
  }
}