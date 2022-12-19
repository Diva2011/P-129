function preload(){
   song1 = loadSound("Song1.mp3");
   song2 = loadSound("Song2.mp3");

   scoreleftWrist = 0;
   scorerightWrist = 0;

   music_status = "";
}

song1 = "";
song2 = "";

leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

function setup(){
   canvas = createCanvas(550,500);
   canvas.center();

   video = createCapture(VIDEO);
   video.hide();

   posenet = ml5.poseNet(video,modelLoaded);
   posenet.on('pose' , gotPoses);
}

function modelLoaded(){
   console.log("Model is initialized!");
}

function gotPoses(results){
   if(results.length>0){
      console.log(results);

      scoreleftWrist = results[0].pose.keypoints[9].score;      
      scorerightWrist = results[0].pose.keypoints[10].score;    
      console.log("Left Wrist Score: " + scoreleftWrist + " Right Wrist Score: " + scorerightWrist);

      leftWristX = results[0].pose.leftWrist.x;
      leftWristX = results[0].pose.leftWrist.y;
      console.log("Left Wrist X: " + leftWristX + "Left Wrist Y: " + leftWristY);

      rightWristX = results[0].pose.rightWrist.x;
      rightWristY = results[0].pose.rightWrist.y;


   }
}


function draw(){
   image(video,0,0,550,500);

   fill('#FF0000');
   stroke('#FF0000');
   music_status = song1.isPlaying();

   if(scorerightWrist > 0.2)
   {
      circle(rightWristX,rightWristY,20);
      song2.play();
      document.getElementById('song_name').innerHTML = "Song Name: Show me the meaning of";
   } 
   else if (scoreleftWrist > 0.2)
   {
      song2.stop();
      circle(leftWristX,leftWristY,20);  
      if(music_status == false){
         song1.play();
         document.getElementById('song_name').innerHTML = "Song Name: I want it that way";
      }
   }
}