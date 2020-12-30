import GameTracker from "../classes/gameTracker";

export default () => {
  const currentGame = new GameTracker();
  const amountOfPlayers = currentGame.getPlayers();
  const bannerElement = document.getElementById("banner");
  const answerElement = document.getElementById("display-answer");
  const headerElement = document.querySelector("h1");

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

    if (amountOfPlayers === 1) {
      document.getElementById("player1Finish").textContent = "OVERVIEW";
      [
        "player-2-finish",
        "player-2-correct",
        "player-2-incorrect",
        "player-2-finish",
      ].forEach(
        (element) => (document.getElementById(element).style.display = "block")
      );
    }
  }, 5000);
};
