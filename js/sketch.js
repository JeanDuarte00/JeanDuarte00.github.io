
let video;
let poseNet;
let poses = [];
let ellipseSize;

function setup() {
  createCanvas(500, 400);
  video = createCapture(VIDEO);
  video.size(width, height);


  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, modelReady);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', function(results) {
    poses = results;
  });
  // Hide the video element, and just show the canvas
  video.hide();
}

function modelReady() {
  select('#status').html('Model Loaded');
}

function draw() {
  image(video, 0, 0, width, height);

  // We can call both functions to draw all keypoints and the skeletons
  drawKeypoints();
  drawSkeleton();
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints()  {
  // Loop through all the poses detected
  for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    let pose = poses[i].pose;
    for (let j = 0; j < pose.keypoints.length; j++) {
      // A keypoint is an object describing a body part (like rightArm or leftShoulder)
      let keypoint = pose.keypoints[j];
      // Only draw an ellipse is the pose probability is bigger than 0.2
      if (keypoint.score > 0.2) {
        if (keypoint.part == "nose") {
            fill(255, 0, 0);
            this.ellipseSize = 20;
        } else {
            fill(100, 100, 100);
            this.ellipseSize = 10;
        }
        noStroke();
        ellipse(keypoint.position.x, keypoint.position.y, this.ellipseSize, this.ellipseSize);
      }
    }
  }
}

// A function to draw the skeletons
function drawSkeleton() {
  // Loop through all the skeletons detected
  for (let i = 0; i < poses.length; i++) {
    let skeleton = poses[i].skeleton;
    // For every skeleton, loop through all body connections
    for (let j = 0; j < skeleton.length; j++) {
      let partA = skeleton[j][0];
      let partB = skeleton[j][1];
      stroke(100, 255, 100);
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
      
    }
  }
}

function semitrografo() {
  console.log("VIDEO:", video);
  if(video.getContext){
    
    var n = 10;
    
    context.clearRect(0,0,width,height);
    
    context.lineWidth = lineWidth;				

    
    // desenha vertical
    for(var c=0; c<10000; c+=n){
      context.beginPath();
      context.strokeStyle = "lightblue";
      context.moveTo(c, 0);
      context.lineTo(c, height);
      context.stroke();
    }

      
    // desenah horizontal
    for(var c=0, cor=0; c<10000; c+=n){
      if (cor > colors.length-1) {
        cor = 0;
      }	
      console.log(c);	
      context.beginPath();
      context.strokeStyle = colors[cor++];
      context.moveTo(0, c);
      context.lineTo(width, c);
      context.stroke();
    }
    
    
    context.closePath();
  }
}