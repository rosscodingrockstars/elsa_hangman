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
  displayWord.innerHTML = underscores.join(" ");
  playButton.style.display = "none";
}

function didYouWin() {

  if (underscores.join("") === selectedWord && guessesLeft >= 0) {
    winSound.play();
    wins++;
  
    winsDisplay.innerHTML = wins;
    playButton.style.display = "block";
  } else if(guessesLeft === 0) {
      loseSound.play();
      losses++; 
      lossesDisplay.innerHTML = losses; 
      playButton.style.display = "block";
    }
  
}

startGame();

function checkGuess(letter) {

  if (event.keyCode >= 65 && event.keyCode <= 90) { 

       let correctLetter = false;

        for (let i = 0; i < selectedWord.length; i++) {
          if(selectedWord[i] === letter) {
            correctLetter = true;
          }
        }

        if(correctLetter) {
          for (let i = 0; i < selectedWord.length; i++) {
            if(selectedWord[i] === letter) {
              underscores[i] = letter
              displayWord.innerHTML = underscores.join(" ");
            }
          }
        }
        else if (lettersGuessed.includes(letter)) {
          alert("You already guessed that letter! Please guess something else!")
        }

        else {
          lettersGuessed.push(letter);
          lettersGuessedDisplay.innerHTML = lettersGuessed.join(", ");
        }

    
  } else { 
    alert("Guess a letter, please!");
  }
}


document.onkeyup = function(event) {
  let userGuess = event.key.toLowerCase();

  checkGuess(userGuess);
  
  if (event.keyCode >= 65 && event.keyCode <= 90 && guessesLeft >= 1) { 
    guessesLeft--;
    guessesLeftDisplay.innerHTML = guessesLeft; 
  }

  didYouWin();
}
