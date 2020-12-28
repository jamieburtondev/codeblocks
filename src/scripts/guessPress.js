import GameTracker from "../classes/gameTracker";
import checkWin from "./checkWin";

const showAnswers = () => {
  document.querySelector(".question").style.display = "none";
  document.querySelector(".answer").style.display = "block";
};

const addCorrect = () => {
    const currentGame = new GameTracker();
    const helpfulLink = `
    <p class='helpful-link'>
      <a target=\"_blank\" href='${currentGame.getQuestion().link}'>
      ${currentGame.getQuestion().about}
      </a>
    </p>`;

    const currentPlayer = currentGame.getCurrentPlayer() === 1 ? "player1" : "player2";

    currentGame.addPoints(currentPlayer);
    currentGame.addCorrect(currentPlayer, helpfulLink);

    const blocks = document.getElementById(
      `${
        currentGame.getCurrentPlayer() === 1 ? "player-1" : "player-2"
      }-block-${currentGame.getPoints(currentPlayer)}`
    );

    let images;

    switch (currentGame.getQuestion().type) {
      case "html":
        images = 'url("./images/html-full.png")';
        break;
      case "css":
        images = 'url("./images/css-full.png")';
        break;
      case "javascript":
        images = 'url("./images/javascript-full.png")';
        break;
    }

    blocks.style.backgroundImage = images;
    blocks.style.backgroundSize = "cover";

    checkWin();
  };

export default () => {
  const currentGame = new GameTracker();
  document.getElementById(
    "answer-link"
  ).textContent = currentGame.getQuestion().about;
  document.getElementById(
    "description"
  ).textContent = currentGame.getQuestion().description;
  document.getElementById(
    "description"
  ).textContent = currentGame.getQuestion().description;
  document
    .getElementById("answer-link")
    .setAttribute("href", currentGame.getQuestion().link);
  document.getElementById("answer-link").setAttribute("class", "helpful-link");

  const inputtedAnswer = document
    .getElementById("input-answer")
    .value.toLowerCase();
  const correctAnswer =
    inputtedAnswer === currentGame.getQuestion().answer.toLowerCase() ||
    inputtedAnswer === "cheat";
  const noInputtedAnswer = document.getElementById("input-answer").value === "";

  if (correctAnswer) {
    document.getElementById("answer-type").textContent = "CORRECT!";
    currentGame.setRightAnswer(true);
    showAnswers();
    addCorrect();
  } else if (noInputtedAnswer) {
    document
      .getElementById("input-answer")
      .setAttribute("placeholder", "Don't forget to answer!");
  } else {
    document.getElementById("answer-type").textContent = "INCORRECT";
    document.getElementById(
      "description"
    ).textContent = currentGame.getQuestion().description;

    const helpfulLink = `<p class='helpful-link'><a target=\"_blank\" href='${
      currentGame.getQuestion().link
    }'> ${currentGame.getQuestion().about} </a></p>`;

    currentGame
      .addIncorrect(`player${currentGame.getCurrentPlayer()}`, helpfulLink);
    showAnswers();
    checkWin();
  }
  document.getElementById("input-answer").value = "";
};
