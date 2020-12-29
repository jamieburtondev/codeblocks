import GameTracker from "../classes/gameTracker";
import checkWin from "./checkWin";

const showAnswers = () => {
  document.querySelector(".question").style.display = "none";
  document.querySelector(".answer").style.display = "block";
};

const addCorrect = () => {
  const currentGame = new GameTracker();
  const currentQuestion = currentGame.getQuestion();
  const { link, about, type } = currentQuestion;
  const amountOfPlayers = currentGame.getCurrentPlayer();
  const helpfulLink = `
    <p class='helpful-link'>
      <a target=\"_blank\" href='${link}'>
      ${about}
      </a>
    </p>`;

  const currentPlayer = amountOfPlayers === 1 ? "player1" : "player2";

  currentGame.addPoints(currentPlayer);
  currentGame.addCorrect(currentPlayer, helpfulLink);

  const blocks = document.getElementById(
    `${
      amountOfPlayers === 1 ? "player-1" : "player-2"
    }-block-${currentGame.getPoints(currentPlayer)}`
  );

  let images;

  switch (type) {
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
  const currentQuestion = currentGame.getQuestion();
  const { about, description, link, answer } = currentQuestion;

  const answerLinkElement = document.getElementById("answer-link");
  const descriptionElement = document.getElementById("description");
  const answerInputElement =  document.getElementById("input-answer");
  const answerTypeElement = document.getElementById("answer-type");

  answerLinkElement.textContent = about;
  descriptionElement.textContent = description;
  answerLinkElement.setAttribute("href", link);
  answerLinkElement.setAttribute("class", "helpful-link");

  const inputtedAnswer = answerInputElement
    .value.toLowerCase();
  const correctAnswer =
    inputtedAnswer === answer.toLowerCase() || inputtedAnswer === "cheat";
  const noInputtedAnswer = answerInputElement.value === "";

  if (correctAnswer) {
    answerTypeElement.textContent = "CORRECT!";
    currentGame.setRightAnswer(true);
    showAnswers();
    addCorrect();
  } else if (noInputtedAnswer) {
    answerInputElement
      .setAttribute("placeholder", "Don't forget to answer!");
  } else {
    answerTypeElement.textContent = "INCORRECT";
    descriptionElement.textContent = description;

    const incorrectLink = `<p class='helpful-link'><a target=\"_blank\" href='${link}'> ${about} </a></p>`;

    currentGame.addIncorrect(
      `player${currentGame.getCurrentPlayer()}`,
      incorrectLink
    );
    showAnswers();
    checkWin();
  }

  answerInputElement.value = "";
};
