let buttonColors = ["red", "blue", "green", "yellow"];
let gameSequence = [];
let userSequence = [];
let level = 0;
let delayTime = 1000;

// To preload the sounds
for (let i = 0; i < buttonColors.length; i++) {
  let sound = new Audio("sounds/" + buttonColors[i] + ".mp3");
  sound.load();
}

// Function to start the game
// This funtion is called when the user clicks the start button
$("#start-btn").on("click", function () {
  $("#start-btn").css("display", "none");
  nextSequence();
});

// Function to generate the next sequence
// This function generates a random color and adds it to the game sequence
function nextSequence() {
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChoosenColor = buttonColors[randomNumber];
  gameSequence.push(randomChoosenColor);

  if (level > 7) {
    delayTime = 500;
  } else if (level > 5) {
    delayTime = 600;
  } else if (level > 3) {
    delayTime = 800;
  } else if (level > 2) {
    delayTime = 950;
  }

  playSequence();
  level++;
  $("#level-title").text("Level " + level);
}

// Function to play the sequence of colors
// This function plays the game sequence with a delay between each color
async function playSequence() {
  $("#bottom-text").css("display", "none");
  $("body").addClass("unclickable");

  for (let i = 0; i < gameSequence.length; i++) {
    $("body").addClass("unclickable");

    await new Promise((resolve) => {
      setTimeout(() => {
        playSound(gameSequence[i]);
        $("#" + gameSequence[i])
          .fadeOut(100)
          .fadeIn(100);
        resolve();
      }, delayTime);
    });
  }

  await new Promise((resolve) => {
    setTimeout(() => {
      $("#bottom-text").css("display", "block");
      $("body").removeClass("unclickable");
      resolve();
    }, delayTime);
  });

  $("body").removeClass("unclickable");
}

// Function to handle button clicks
// This function checks if the user has clicked the correct button
$(".btn").on("click", function () {
  userChoosenColor = this.id;

  playSound(this.id);
  animatePress(this.id);

  if (level >= 1) userSequence.push(userChoosenColor);

  if (userSequence.length <= gameSequence.length) {
    checkAnswer();
    if (userSequence.length === gameSequence.length && level != 0) {
      setTimeout(function () {
        nextSequence();
      }, 500);
      userSequence = [];
    }
  }
});

// Function to check the user's answer
// This function compares the user's sequence with the game sequence
function checkAnswer() {
  for (let i = 0; i < userSequence.length; i++) {
    if (userSequence[i] === gameSequence[i]) {
      continue;
    } else {
      $("body").addClass("game-over");
      $("#level-title").text("Game Over! Your Score: " + (level - 1));
      startOver();
      setTimeout(function () {
        playSound("wrong");
        $("body").removeClass("game-over");
      }, 200);
      break;
    }
  }
}

// Function to reset the game
// This function resets the game variables and UI elements
function startOver() {
  $("#bottom-text").css("display", "none");
  $("#start-btn").css("display", "inline-block");
  gameSequence = [];
  userSequence = [];
  level = 0;
}

// Function to play sound
// This function creates a new Audio object and plays the sound file
function playSound(soundName) {
  let sound = new Audio("sounds/" + soundName + ".mp3");
  sound.play();
}

// Function to animate the button press
// This function adds a class to the button when pressed and removes it after a short delay
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(() => {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}