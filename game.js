var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

//STEP 7 - Start the gamePattern
var started =false;
var level = 0;

$(document).keypress(function() {
  if(!started){
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});
// STEP 4
// Check which Button is Clicked

  $(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
    // alert($(this).attr("id")); //Lay gi tri ID hien tai cua this, this la button duoc clicked.
    // console.log(userClickedPattern); //Print array by console log
  });




function nextSequence() {
  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColors[randomNumber];
  var animateBlinking = $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  gamePattern.push(randomChosenColour);
  playSound(randomChosenColour);
  // return randomNumber, randomChosenColour

}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3")
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  },100);
}

function checkAnswer(currentLevel) {
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    console.log("Success");
    if(gamePattern.length === userClickedPattern.length){
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }
  else {
    console.log("wrong");
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("#level-title").text("Game over, Press Any key to Restart");
    startover();
    }

  //Add The Scores
  // $(".container").before("<h2>Your score: " + level + "</h2>");
  // $("h2").attr("id", "level-title");
}

function startover(){
  level = 0;
  started = false;
  gamePattern = [];
  //$("#level-title").css("color", "");
}
