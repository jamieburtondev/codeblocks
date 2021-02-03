import GameTracker from "../classes/gameTracker";
import setQuestion from './setQuestion';
import setup from './setup';

const nextTurn = () => {
  const currentGame = new GameTracker();
  const answerElement = document.getElementById("display-answer");
  const currentPlayer = currentGame.getCurrentPlayer();
  const currentPlayerElement = document.getElementById(
    `player${currentPlayer}`
  )
  currentGame.addTurn();
  answerElement.style.display = "none";
  currentPlayerElement.style.display = "flex";
  setQuestion();
  setup();
};

export default () => {
  const currentGame = new GameTracker();
  const bannerElement = document.getElementById("banner");
  const currentPlayer = currentGame.getCurrentPlayer();
  const currentScoreElement = document.getElementById(`current-score-player-${currentPlayer}`);
  const player1Points = currentGame.getPoints('player1');
  const player2Points = currentGame.getPoints('player2');
  const currentTurn = currentGame.getTurn();
  const points = currentGame.getPoints(
    currentPlayer === 1 ? "player1" : "player2"
  );
  const inVersus = currentGame.getPlayers() > 1;
  const rightAnswer = currentGame.isRightAnswer();
  const suddenDeath = currentGame.isSuddenDeath();

  const animateBlockInFromLeft = points === 1 || points === 4 || points === 7;
  const animateBlockInFromTop = points === 2 || points === 5 || points === 8;
  const animateBlockInFromRight = points === 3 || points === 6 || points === 9;

  if (rightAnswer) {
    let move;
    if (animateBlockInFromLeft) {
      move = "left";
    } else if (animateBlockInFromTop) {
      move = "top";
    } else if (animateBlockInFromRight) {
      move = "right";
    }

    const blocks = `${
      currentPlayer === 1 ? "player-1" : "player-2"
    }-block-${points}`;

    $(`#${blocks}`).animate({ [move]: "-=800px" }, 0);
    $(`#${blocks}`).animate({ [move]: "+=400px" }, 750, "linear");
    $(`#${blocks}`).animate({ [move]: "+=400px" }, 750, "linear");

    currentGame.setRightAnswer(false);
  }

  let sayNextPlayer = '';

  if (inVersus) sayNextPlayer = `Player ${currentPlayer === 1 ? 2 : 1} is next.`;
 
  currentScoreElement.textContent = `Player ${currentPlayer} currently has ${points} ${points === 1 ? 'point' : 'points'} out of 9 points. ${sayNextPlayer}`;

  if (suddenDeath) {
    bannerElement.style.display = "block";
    bannerElement.textContent = "SUDDEN DEATH";

    if (
      (currentTurn % 2 === 0 &&
        player1Points > player2Points) ||
      (currentTurn % 2 === 0 &&
        player2Points > player1Points)
    ) {
      breakdown();
    } else {
      nextTurn();
    }
  }

  nextTurn();
};
