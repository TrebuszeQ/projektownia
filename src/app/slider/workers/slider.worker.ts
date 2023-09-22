/// <reference lib="webworker" />
let speed: number = 3000;
let cleared: boolean = false;

addEventListener('message', ({ data }) => {
  // const response = `worker response to ${data}`;
  // console.log(response);
  autoSlide(data[0]);
  speed = data[1];
});


let interval2 = setInterval(intervalHandlerSlide, speed);
let intervalRenew = setInterval(intervalHandlerRenew, 9000);

// posts message to slider service
function intervalHandlerSlide() {
  cleared = false;
  postMessage(true);
}


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
      postMessage(false);
      break;

    case true:
      interval2 = setInterval(intervalHandlerSlide, speed);
      break;
  }
}