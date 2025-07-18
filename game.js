
var buttonColours =["red", "blue", "green", "yellow"]; 
var userClickedPattern = [];
var gamePattern = [];
var level = 0;
var started = false;


$(document).keypress(function(){
  if(!started){
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;    
  }
});

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
    
  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

function nextSequence() {
  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);
  
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);  
  
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed");
  setTimeout( ()=>{
    $("#" + currentColour).removeClass("pressed");
  },100);
}


function playSound(name) {
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}

function checkAnswer(currentLevel){
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(()=>{
        nextSequence();
      },1000);
    }
    
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    
    $("#level-title").text("Game Over, Press A Key to Restart");
    
    setTimeout(()=>{
      $("body").removeClass("game-over");
    },1000);
    
    startOver();
  }
}

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}