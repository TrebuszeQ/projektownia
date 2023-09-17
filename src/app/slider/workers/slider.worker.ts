/// <reference lib="webworker" />

addEventListener('message', ({ data }) => {
  // const response = `worker response to ${data}`;
  // console.log(response);
  autoSlide(data[0], data[1]);
});


function setSetInterval(speed: number) {
  let interv = setInterval( 
    () => {
      postMessage(true);
  }, speed);
  return interv;
}


function autoSlide(on: boolean, speed: number) {
  let interval;
  if (on) interval = setSetInterval(speed);
  else if (!on) {
    console.log("cleared");
    clearInterval(interval);
    postMessage(false)
  }
}