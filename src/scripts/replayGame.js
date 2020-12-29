import GameTracker from "../classes/gameTracker";
import setup from './setup';

export default () => {
  const currentGame = new GameTracker();
  const turnElement = document.getElementById("turn");
  const colorBlockElement = document.querySelector(".color-block");
  const player1Element = document.getElementById("player1");
  const finishElement = document.querySelector(".finish");

  finishElement.style.display = "none";
  currentGame.resetTurns();
  currentGame.setCurrentPlayer(1);
  colorBlockElement.style.backgroundImage = "none";
  player1Element.style.display = "block";
  turnElement.style.display = "block";
  turnElement.textContent = "PLAYER 1";

  setup();
};
