import GameTracker from "../classes/gameTracker";
import breakdown from "./breakdown";

export default () => {
  const currentGame = new GameTracker();
  const lastTurn = currentGame.isLastTurn();
  const amountOfPlayers = currentGame.getPlayers();
  const player1Points = currentGame.getPoints("player1");
  let player2Points =
    amountOfPlayers === 2 ? currentGame.getPoints("player2") : null;

  const tieGame =
    lastTurn && player1Points === 9 && player2Points === 9;
  const winner =
    (lastTurn && player1Points === 9 && player2Points === 8) ||
    (player2Points === 9 && player1Points !== 9) ||
    (player1Points === 9 && player2Points < 8);
  const oneTurnLeft = player1Points === 9 && player2Points === 8;

  if (tieGame) {
    currentGame.makeSuddenDeath();
    currentGame.resetTurns();
    currentGame.resetPoints();
  } else if (winner) {
    breakdown();
  } else if (oneTurnLeft) {
    currentGame.makeLastTurn();
  }
};
