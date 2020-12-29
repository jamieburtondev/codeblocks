import GameTracker from "../classes/gameTracker";
import setQuestion from './setQuestion';
import setup from './setup';

const nextTurn = () => {
  const currentGame = new GameTracker();
  currentGame.addTurn();
  document.querySelector(".answer").style.display = "none";
  document.getElementById(
    `player${currentGame.getCurrentPlayer()}`
  ).style.display = "block";
  setQuestion();
  setup();
};

export default () => {
  const currentGame = new GameTracker();
  const bannerElement = document.getElementById("banner");
  const points = currentGame.getPoints(
    currentGame.getCurrentPlayer() === 1 ? "player1" : "player2"
  );

  const animateBlockInFromLeft = points === 1 || points === 4 || points === 7;
  const animateBlockInFromTop = points === 2 || points === 5 || points === 8;
  const animateBlockInFromRight = points === 3 || points === 6 || points === 9;

  if (currentGame.isRightAnswer()) {
    let move;
    if (animateBlockInFromLeft) {
      move = "left";
    } else if (animateBlockInFromTop) {
      move = "top";
    } else if (animateBlockInFromRight) {
      move = "right";
    }

    const blocks = `${
      currentGame.getCurrentPlayer() === 1 ? "player-1" : "player-2"
    }-block-${points}`;

    $(`#${blocks}`).animate({ [move]: "-=800px" }, 0);
    $(`#${blocks}`).animate({ [move]: "+=400px" }, 750, "linear");
    $(`#${blocks}`).animate({ [move]: "+=400px" }, 750, "linear");

    currentGame.setRightAnswer(false);
  }

  if (currentGame.isSuddenDeath()) {
    bannerElement.style.display = "block";
    bannerElement.textContent = "SUDDEN DEATH";

    if (
      (currentGame.getTurn() % 2 === 0 &&
        currentGame.getPoints("player1") > currentGame.getPoints("player2")) ||
      (currentGame.getTurn() % 2 === 0 &&
        currentGame.getPoints("player2") > currentGame.getPoints("player1"))
    ) {
      breakdown();
    } else {
      nextTurn();
    }
  }

  nextTurn();
};
