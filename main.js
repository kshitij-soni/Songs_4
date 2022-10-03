song="";
song2="";
leftWristX=0;
leftWristY=0;
rightWristX="";
rightWristY="";
songStatus="";
song2Status="";
LeftC="";
RightC="";

function preload(){
   song= loadSound('music.mp3');
   song2= loadSound('music2.mp3');

}

function setup(){
    canvas=createCanvas(600,500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();
console.log("TestVideo");
    pose= ml5.poseNet(video, modelLoaded);
    pose.on('pose', gotPoses);
}

function modelLoaded(){
    console.log('success');
}

function gotPoses(results){
    if(results.length > 0){
      console.log(results);
      leftWristX = results[0].pose.leftWrist.x;  
      leftWristY = results[0].pose.leftWrist.y; 
      rightWristX = results[0].pose.leftWrist.x; 
      rightWristY = results[0].pose.leftWrist.y; 
      LeftC=results[0].pose.keypoints[9].score;    
      RightC=results[0].pose.keypoints[10].score;  
    }
}

function draw(){
    songStatus=song.isPlaying();
    song2Status=song2.isPlaying();
    image(video, 0, 0, 600, 500);
    fill("red");
    stroke("red");
    if(LeftC > 0.2){
    circle(leftWristX, leftWristY, 20);
    console.log(leftWristY);
    song2.stop();
    if(songStatus==false){
       song.play(); 
       document.getElementById("songPlay").innerHTML="tune";
    }
}
if(RightC > 0.2){
    circle(RightWristX, RightWristY, 20);
    console.log(RightWristY);
    song.stop();
    if(song2Status==false){
       song2.play(); 
       document.getElementById("songPlay").innerHTML="song";
    }
}
}

function fun(){
    song.play();
}