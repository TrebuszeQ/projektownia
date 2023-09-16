/// <reference lib="webworker" />

addEventListener('message', ({ data }) => {
  // const response = `worker response to ${data}`;
  // console.log(response);
  autoSlide(data);
});


function autoSlide(on: boolean) {
  // console.log("called");
  let interv = () => setInterval( 
    () => {
      postMessage(true)
  }, 3000);
  if (on) interv();
  else if (!on) {
    console.log("cleared");
    clearInterval(interv());
    postMessage(false)
  }
}