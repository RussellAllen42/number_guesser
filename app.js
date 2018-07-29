/*
  Game function:
  - Player must guess a number between a min and max
  - Player gets a certain amount of guesses
  - Notify player of guesses remaning
  - Notify the plaer of the correct answer if they loose
  - Let player choose to play again
*/
// Game values
let min = 1,
  max = 10,
  winningNum = getRandomNum(min, max),
  guessesLeft = 3;

//UI elements
const UIgame = document.querySelector("#game"),
  minNum = document.querySelector(".min-num"),
  maxNum = document.querySelector(".max-num"),
  guessBtn = document.querySelector("#guess-btn"),
  guessInput = document.querySelector("#guess-input"),
  message = document.querySelector(".message");

//Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

//play agin event listener
game.addEventListener("mousedown", function(e) {
  if (e.target.className === "play-again") {
    window.location.reload();
  }
});

//Listen fro guess
guessBtn.addEventListener("click", function() {
  let guess = parseInt(guessInput.value);
  console.log(guess);
  //validate
  if (isNaN(guess) || guess < min || guess > max) {
    setMeassage(`Please enter a number between ${min} and ${max}`, "red");
  }
  //Check if won
  if (guess === winningNum) {
    //Game over WON
    gameOver(true, `${winningNum} is correct! YOU WIN`);
  } else {
    //wrong number guess
    guessesLeft -= 1;
    if (guessesLeft === 0) {
      //Game over - LOST
      gameOver(
        false,
        `Game over, you lost. The correct number was ${winningNum}`
      );
    } else {
      guessInput.style.borderColor = "red";
      // clear input
      guessInput.value = "";
      //Tell the user its the wrong number
      setMeassage(`Guess in not correct, ${guessesLeft} guesses left`, "red");
    }
  }
});
//Game over function
function gameOver(won, msg) {
  let color;
  won === true ? (color = "green") : (color = "red");
  //disable input
  guessInput.disabled = true;
  // change border color
  guessInput.style.borderColor = color;
  // set text color
  message.style.color = color;
  // Set message
  setMeassage(msg);
  // Play again
  guessBtn.value = "Play Again";
  guessBtn.className += "play-again";
}

//get winning number
function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

//set meassage
function setMeassage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}
