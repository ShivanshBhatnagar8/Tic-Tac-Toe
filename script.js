"use strict";
const text = document.querySelector(".text"); //To determine player chance, winner and if the game is draw
const restart = document.querySelector(".Restart"); //For restart button
let isWinner;
//Factory function to create Players
function settingPlayers(name, marker, win) {
  return { name, marker, win };
}

const gameBoard = (function () {
  const board = document.querySelectorAll(".game-square"); // Board where the game will be played
  let player1 = new settingPlayers("Player1", "X", false); //Creating Player 1
  let player2 = new settingPlayers("Player2", "O", false); //Creating player 2
  let game = []; //Used to handle Draw Functionality
  let activePlayer; //for storing Active Player
  const switchPlayerTurn = () => {
    return (activePlayer = activePlayer === player1 ? player2 : player1); //Getting Active Player
  };

  board.forEach((element) => {
    element.addEventListener("click", function () {
      if (
        element.textContent === "" &&
        text.textContent !== "Player 1 is the Winner" &&
        text.textContent !== "Player 2 is the Winner"
      ) {
        game.push(element);

        element.textContent = switchPlayerTurn().marker;
        if (element.textContent === "X") {
          element.style.color = "red";
          text.textContent = "Player 2 Chance";
          text.style.color = "white";
        } else if (element.textContent === "O") {
          text.textContent = "Player 1 Chance";
          element.style.color = "white";
          text.style.color = "red";
        }

        if (game.length === 9) {
          text.textContent = "It's a Draw!"; //Game is Draw
        }
      }

      //This whole function above is to mark the gameBoard with Xs and Os

      //Below is the functionality to find out the winner
      const winningCondition = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
      for (let i = 0; i < winningCondition.length; i++) {
        if (
          board[winningCondition[i][0]].textContent === player1.marker &&
          board[winningCondition[i][1]].textContent === player1.marker &&
          board[winningCondition[i][2]].textContent === player1.marker
        ) {
          text.textContent = "Player 1 is the Winner";
          text.style.color = "black";
        } else if (
          board[winningCondition[i][0]].textContent === player2.marker &&
          board[winningCondition[i][1]].textContent === player2.marker &&
          board[winningCondition[i][2]].textContent === player2.marker
        ) {
          text.textContent = "Player 2 is the Winner";
          text.style.color = "black";
        }
      }
    });
  });

  restart.addEventListener("click", function () {
    //To restart the game to make it playable again
    text.textContent = "Player 1 Chance";
    text.style.color = "red";
    board.forEach((element) => {
      element.textContent = "";
    });
    activePlayer = switchPlayerTurn().activePlayer;
    game.length = 0;
  });

  return { player1, player2, switchPlayerTurn, restart };
})();
