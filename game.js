let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let delayTime = 1000;

// To preload the sounds
for (let i = 0; i < buttonColors.length; i++) {
  let sound = new Audio("sounds/" + buttonColors[i] + ".mp3");
  sound.load();
}

$("#start-btn").on("click", function () {
  if (level === 0) {
    nextSequence();
  }
  $("#start-btn").css("display","none");
});

function startOver() {
  $("#bottom-text").css("display","none");
  $("#start-btn").css("display","inline-block");
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
}

function nextSequence() {
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChoosenColor = buttonColors[randomNumber];

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
  let sound = new Audio("sounds/" + soundName + ".mp3");
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
      $("#level-title").text("Game Over! Your Score: " + (level-1));
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
