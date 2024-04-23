song="";
song_status="empty";
song2="";
song2_status="empty";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;

function preload(){
    song=loadSound("music.mp3");
    song2=loadSound("music2.mp3");
}

function setup(){
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses)

}

function modelLoaded(){
    console.log("Posenet is Intialized!")
}

function draw(){
    image(video, 0, 0, 600, 500);

    fill("#FF0000");
    stroke("#FF0000");

    if(scoreLeftWrist > 0.2 && song_status=="empty"){
    circle(leftWristX,leftWristY,20);
    play();
    }
    else if(scoreRightWrist > 0.2 && song_status=="playing"){
        circle(rightWristX,rightWristY,20);
        play2();
        song_status="";

    }
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
    song_status="playing";
}

function play2(){
    song.stop();
    song2.play();
    song2.setVolume(1);
    song2.rate(1);
}

function gotPoses(results){
    if(results.length>0){
        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist)

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + " rightWristY = " + rightWristY);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + " leftWristY = " + leftWristY);
    }
}