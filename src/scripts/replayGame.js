import GameTracker from "../classes/gameTracker";
import setup from './setup';

export default () => {
  const currentGame = new GameTracker();
  document.querySelector(".finish").style.display = "none";
  currentGame.resetTurns();
  currentGame.setCurrentPlayer(1);
  document.querySelector(".color-block").style.backgroundImage = "none";
  document.getElementById("player1").style.display = "block";
  document.getElementById("turn").style.display = "block";
  document.getElementById("turn").textContent = "PLAYER 1";

  setup();
};
