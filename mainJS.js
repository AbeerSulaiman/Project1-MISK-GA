
//declaring game board in array
//declaring a function for playing
// declaring global variables

const capAmerica = '<img src="./images/captainAmerica.svg">';
const ironMan = '<img src="./images/ironMan.svg">';

let gameBoardFull = false;
let gameBoard = ["", "", "", "", "", "", "", "", ""];

const gameBoardContainer = document.querySelector(".gameBoard");

const winnerMessageMessage = document.getElementById("winnerMessage");

isBoardFull = () => {
  let boardFull = true;
  gameBoard.forEach(element => {
    if (element != capAmerica && element != ironMan) {
      boardFull = false;
    }
  });
  gameBoardFull = boardFull;
};

/// check the matching of row || column || diagonal

const checkLines = (first, second, third) => {
  return (
    gameBoard[first] == gameBoard[second] &&
    gameBoard[second] == gameBoard[third] &&
    (gameBoard[first] == capAmerica || gameBoard[first] == ironMan)
  );
};

const checkMatch = () => {
  for (i = 0; i < 9; i += 3) {
    if (checkLines(i, i + 1, i + 2)) {
      document.querySelector(`#boardCell${i}`).classList.add("winner");
      document.querySelector(`#boardCell${i + 1}`).classList.add("winner");
      document.querySelector(`#boardCell${i + 2}`).classList.add("winner");
      return gameBoard[i];
    }
  }
  for (i = 0; i < 3; i++) {
    if (checkLines(i, i + 3, i + 6)) {
      document.querySelector(`#boardCell${i}`).classList.add("winner");
      document.querySelector(`#boardCell${i + 3}`).classList.add("winner");
      document.querySelector(`#boardCell${i + 6}`).classList.add("winner");
      return gameBoard[i];
    }
  }
  if (checkLines(0, 4, 8)) {
    document.querySelector("#boardCell0").classList.add("winner");
    document.querySelector("#boardCell4").classList.add("winner");
    document.querySelector("#boardCell8").classList.add("winner");
    return gameBoard[0];
  }
  if (checkLines(2, 4, 6)) {
    document.querySelector("#boardCell2").classList.add("winner");
    document.querySelector("#boardCell4").classList.add("winner");
    document.querySelector("#boardCell6").classList.add("winner");
    return gameBoard[2];
  }
  return "";
};
//check if there is any winnerMessage
const iswinnerMessage = () => {
  let res = checkMatch()
  if (res == capAmerica) {
    winnerMessage.innerText = "Captain America you are the winner!";
    winnerMessage.classList.add("capAmericaWin");
    gameBoardFull = true
  } else if (res == ironMan) {
    winnerMessage.innerText = "You Can't beat me, I'm Iron Man I'm the winner!";
    winnerMessage.classList.add("ironManWin");
    gameBoardFull = true
  } else if (gameBoardFull) {
    winnerMessage.innerText = "Draw! Seems you're both unbeatable!";
    winnerMessage.classList.add("draw");
  }
};


const getGameBoard = () => {
  gameBoardContainer.innerHTML = ""
  gameBoard.forEach((e, i) => {
    gameBoardContainer.innerHTML += `<div id="boardCell${i}" class="block" onclick="addcapAmericaMove(${i}); playSound();">${gameBoard[i]}</div>`
    if (e == capAmerica || e == ironMan) {
      document.querySelector(`#boardCell${i}`).classList.add("ironManTurn");
    }
  });
};

const gameKeepLooping = () => {
  getGameBoard();
  isBoardFull();
  iswinnerMessage();
  // playSound();
}
//declaring capAmericas movement between ironman & capAmerica (capAmerica && ironMan)

const addcapAmericaMove = e => {
  if (!gameBoardFull && gameBoard[e] == "") {
    gameBoard[e] = capAmerica;
    gameKeepLooping();
    addironManMove();
  }
};
//ironMan move , selcted randomly from 1 to 9
const addironManMove = () => {
  if (!gameBoardFull) {
    do {
      selected = Math.floor(Math.random() * 9);
    } while (gameBoard[selected] != "");
    gameBoard[selected] = ironMan;
    gameKeepLooping();
  }
};
/// reset the game board after restart
const resetBoard = () => {
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  gameBoardFull = false;
  winnerMessage.classList.remove("capAmericaWin");
  winnerMessage.classList.remove("ironManWin");
  winnerMessage.classList.remove("draw");
  winnerMessage.innerText = "";
  getGameBoard();
};
// sound effect

function playSound(){ 
let sound = new Audio("./music/Blob.mp3")
sound.play();
}
window.onload = function(){
  document.getElementById("#MarvelOpen").play();
}
// function toggleDarkLight() {
//   let body = document.getElementById("body");
//   let currentMode = body.class;
//   body.class = currentMode == "darkMode" ? "lightMode" : "darkMode";
// }

getGameBoard();