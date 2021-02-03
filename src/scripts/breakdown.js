import GameTracker from "../classes/gameTracker";

export default () => {
  const currentGame = new GameTracker();
  const amountOfPlayers = currentGame.getPlayers();
  const bannerElement = document.getElementById("banner");
  const answerElement = document.getElementById("display-answer");
  const headerElement = document.querySelector("h1");
  const player1Points = currentGame.getPoints("player1");
  let player2Points =
    amountOfPlayers === 2 ? currentGame.getPoints("player2") : null;

  answerElement.style.display = "none";
  document.getElementById(
    `player${currentGame.getCurrentPlayer()}`
  ).style.display = "flex";
  bannerElement.style.display = "block";
  headerElement.style.visibility = "hidden";

  if (amountOfPlayers === 1) {
    bannerElement.textContent = "BLOCK COMPLETED";
  } else if (player1Points > player2Points) {
    bannerElement.textContent = "PLAYER 1 WINS";
  } else if (player2Points > player1Points) {
    bannerElement.textContent = "PLAYER 2 WINS";
  }

  setTimeout(() => {
    if (amountOfPlayers === 1) {
      document.getElementById('player-2-breakdown').style.display = 'none';
      document.getElementById("player-1-finish").textContent = "OVERVIEW";
    } else {
      document.getElementById('player-2-breakdown').style.display = 'block';
    }

    headerElement.style.visibility = "visible";

    ["turn", "banner", `player${currentGame.getCurrentPlayer()}`].forEach(
      (element) => (document.getElementById(element).style.display = "none")
    );

    document.getElementById("display-finish").style.display = "block";
    
    ["1", "2"].forEach(num => {
      currentGame.getCorrectQuestions(`player${num}`).forEach(question => {
        $(`#player-${num}-correct`).append(question);
      });

      currentGame.getIncorrectQuestions(`player${num}`).forEach(question => {
        $(`#player-${num}-incorrect`).append(question);
      });
    })
  }, 5000);
};
