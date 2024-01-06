var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var delayTime = 1000;

$("#level-title").on("click", function () {
  if (level === 0) {
    nextSequence();
  }
});

function startOver() {
  gamePattern = [];
  userClickedPattern = [];
  $("#bottom-text").text("Your Score: " + (level-1))
  level = 0;
}

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChoosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChoosenColor);
  
  if (level > 2) {
    delayTime = 950;
    if (level > 3) {
      delayTime = 800;
      if (level > 5) {
        delayTime = 600;
        if (level > 7) {
          delayTime = 500;
        }
      }
    }
  }

  for (let i = 0; i < gamePattern.length; i++) {

    setTimeout(function () {
      playSound(gamePattern[i]);
      $("#" + gamePattern[i])
        .fadeOut(100)
        .fadeIn(100);

      }, delayTime * (i + 1));
    }
    
  toggleClickable((gamePattern.length * delayTime) + 800);
  
  level++;
  $("#level-title").text("Level " + level);
}

$(".btn").on("click", function () {
  userChoosenColor = this.id;

  playSound(this.id);
  animatePress(this.id);

  if (level >= 1) userClickedPattern.push(userChoosenColor);

  if (userClickedPattern.length <= gamePattern.length) {
    checkAnswer();
    if (userClickedPattern.length === gamePattern.length && level != 0) {
      setTimeout(function() {
        nextSequence();
      }, 500);
      userClickedPattern = [];
    }
  }
});

function playSound(soundName) {
  var sound = new Audio("sounds/" + soundName + ".mp3");
  sound.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(() => {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer() {
  for (let i = 0; i < userClickedPattern.length; i++) {
    if (userClickedPattern[i] === gamePattern[i]) {
      continue;
    } else {
      $("body").addClass("game-over");
      console.log(level);
      $("#level-title").text("Game Over! Click here to Restart");
      startOver();
      setTimeout(function () {
        playSound("wrong");
        $("body").removeClass("game-over");
      }, 200);
      break;
    }
  }
}

function toggleClickable(time) {
  $("#bottom-text").css("display", "none");
  $("body").addClass("unclickable");
  setTimeout(function () {
    $("#bottom-text").css("display", "block");
    $("body").removeClass("unclickable");
  }, time);
}
