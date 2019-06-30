


let slider;
let canvas;
let objCanvas;
let context;
let webcam;
let swatch;
let score = 0;
let gotItAudio;

slider     = document.getElementById("tolerance");
canvas     = document.getElementById('canvas');
objCanvas  = document.getElementById('objCanvas');
context    = canvas.getContext('2d');
objContext = objCanvas.getContext('2d');
webcam     = document.getElementById('webcam');
swatch     = document.getElementById("color");
gotItAudio = new Audio("gotIt.mp3");

let position = {x:0, y:0, width:50, height:50};
let pos = getNewPosition();
position.x = pos.x;
position.y = pos.y;

// Wait for the page to be ready
window.addEventListener("load", function(e) {

  console.log("Page loaded!");

  // Store the color we will be tracking (selectable by clicking on the webcam feed)
  var color = {r: 255, g: 255, b: 0}; // yellow colors

 

  // Create the color tracking object
  var tracker = new tracking.ColorTracker( ['magenta', 'cyan'] );


  // Add callback for the "track" event
  tracker.on('track', function(e) {


    

    objContext.clearRect(0, 0, objCanvas.width, objCanvas.height);
    context.clearRect(0, 0, canvas.width, canvas.height);

    drawObj(objContext, position);

    //if (e.data.length !== 0) {


      e.data.forEach(function(rect) {        

        drawRect(rect, context, color);
        
        if( detectColision(rect) ){
          console.log("NA AREA");
          toScore();
          gotItAudio.play();
          pos = getNewPosition();
          position.x = pos.x;
          position.y = pos.y;
          console.log("new pos: "+pos.x+"::::"+pos.y);
          drawObj( objContext, position );
        }
      });

   // }

  });

  // Start tracking
  tracking.track(webcam, tracker, { camera: true } );

});

// Calculates the Euclidian distance between the target color and the actual color
function getColorDistance(target, actual) {
  return Math.sqrt(
    (target.r - actual.r) * (target.r - actual.r) +
    (target.g - actual.g) * (target.g - actual.g) +
    (target.b - actual.b) * (target.b - actual.b)
  );
}

// Returns the color at the specified x/y location in the webcam video feed
function getColorAt(webcam, x, y) {

  // To be able to access pixel data from the webcam feed, we must first draw the current frame in
  // a temporary canvas.
  var canvas = document.createElement('canvas');
  var context = canvas.getContext('2d');
  canvas.width = webcam.width;
  canvas.height = webcam.height;
  context.drawImage(webcam, 0, 0, webcam.width, webcam.height);

  // Then we grab the pixel information from the temp canvas and return it as an object
  var pixel = context.getImageData(x, y, 1, 1).data;
  return {r: pixel[0], g: pixel[1], b: pixel[2]};

}

// Draw a colored rectangle on the canvas
function drawRect(rect, ctx, color) {

  ctx.strokeStyle = "rgb(" + color.r + ", " + color.g + ", " + color.b + ")";
  ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);

  ctx.beginPath();
  ctx.arc( rect.x, rect.y, 10, 0, 2 * Math.PI);
  ctx.stroke(); 

  var offsetY = document.getElementById("offsetY");
  var offsetX = document.getElementById("offsetX");


  offsetX.innerText =  rect.x;
  offsetY.innerText =  rect.y;
}

function drawObj( ctx, axi ){
  ctx.strokeStyle = "rgb(255,255,0)";
  ctx.fillRect(axi.x, axi.y, axi.width, axi.height);

}

function detectColision(rect){


  let offsetY = document.getElementById("offsetY");
  let offsetX = document.getElementById("offsetX");

  console.log("Posição atual=> " + offsetX.innerText + ":" + offsetY.innerText);

  if( rect.x > position.x && rect.y > position.y && rect.width < position.width && rect.height < position.height){

    return true;
  }
 
}
 

function getNewPosition(){
  let axiY = Math.floor( (Math.random() * canvas.height - position.height) + 0 );
  let axiX = Math.floor( (Math.random() * canvas.width - position.width) + 0 );

  let axis = {x: axiX, y: axiY};
  return axis;
}

function toScore(){
   let scoreTag = document.getElementById("score");
   score++;
   scoreTag.innerHTML = score;
}