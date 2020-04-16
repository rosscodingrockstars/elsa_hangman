let wins = 0;
let losses = 0;
let guessesLeft = 10;
let lettersGuessed = [];
let winsDisplay = document.getElementById("wins");
let lossesDisplay = document.getElementById("losses");
let guessesLeftDisplay = document.getElementById("guesses-left");
let letterCounter = 0;
const lettersGuessedDisplay = document.getElementById("letters-guessed");
const wordBank = [
  "bull",
  "axolotl",
  "lumpsucker",
  "sturgeon",
  "blobfish",
  "hellbender",
  "oxen",
  "octi",
  "human",
  "horse",
  "chicken",
  "giraffe",
  "dog",
  "cat",
  "pig",
  "fruitbat",
  "bat",
  "snake",
  "sloth",
  "cow",
  "koala",
  "sheep",
  "goat",
  "deer",
  "squirrel",
  "rat",
  "mouse",
  "fish",
  "okapi",
  "rhino",
  "tiger",
  "lion",
  "lioness",
  "turtle",
  "polar-bear",
  "rabbit",
  "owl",
  "frog",
  "toad",
  "lemur",
  "boar",
  "vole",
  "seadragon",
  "dolphin",
  "parrot",
  "whale"
];
let selectedWord = "";
let displayWord = document.getElementById("chosen-word");
let underscores = [];
const playButton = document.getElementById("play-again");
const winSound = new Audio("sounds/victory_or_wedding_music_with_bells_c64_style (1).ogg");
const loseSound = new Audio("sounds/Icy Game Over.mp3");

function startGame() {
  winSound.pause();
  loseSound.pause();
  selectedWord = "";
  underscores = [];
  guessesLeft = 10;
  guessesLeftDisplay.innerHTML = guessesLeft;
  letterCounter = 0;
  lettersGuessed = [];
  lettersGuessedDisplay.innerHTML = lettersGuessed;
  selectedWord = wordBank[Math.floor(Math.random() * wordBank.length)];
  for (let i = 0; i < selectedWord.length; i++) {
    if (selectedWord[i] === "-") {
      underscores[i] = "-";
    } else {
      underscores[i] = "_";
    }
  }
  console.log(selectedWord);
  displayWord.innerHTML = underscores.join(" ");
  playButton.style.display = "none";
}

startGame();

function didYouWin() {
  if (letterCounter === selectedWord.length && guessesLeft >= 0) {
    wins++;
    winSound.play();
    winDisplay.innerHTML = wins;
    playButton.style.display = "block";
  } else {
   if(letterCounter !== selectedWord.length && guessesLeft <= 1){
      losses++;
      loseSound.play();
      lossesDisplay.innerHTML = losses;
      playButton.style.display = "block";
    }
  }
}

document.onkeyup = function (event) {
  let userGuess = event.key.toLowerCase();
  if (event.keyCode < 65 || event.keyCode > 90) {
    alert('Guess a letter, please!');
  }
  if (selectedWord.indexOf(userGuess) > -1 && event.keyCode >= 65 && event.keyCode <= 90) {
    for (let i = 0; i < selectedWord.length; i++) {
      
     
      if (selectedWord[i] === userGuess) {
        underscores[i] = userGuess;
        displayWord.innerHTML = underscores.join(" ");
        letterCounter++;
        didYouWin();
      }
    }
  } else {
    if (!selectedWord.indexOf(userGuess) > -1 && event.keyCode >= 65 && event.keyCode <= 90 && lettersGuessed.indexOf (userGuess) === -1) {
      lettersGuessed.push(userGuess);
      lettersGuessedDisplay.innerHTML = lettersGuessed.join(", ");
      didYouWin();
    }
   else {
     if (lettersGuessed.indexOf(userGuess) > -1) {
       alert('You already guessed that letter! Please guess something else!')
     }
   } 
  }
  if (guessesLeft > 0 && event.keyCode <= 65 && event.keyCode >= 90 && lettersGuessed.indexOf (userGuess) === -1) {
    guessesLeft--;
    guessesLeftDisplay.innerHTML = guessesLeft;
  }
};
