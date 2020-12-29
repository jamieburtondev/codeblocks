import GameTracker from "../classes/gameTracker";
import checkWin from "./checkWin";

const showAnswers = () => {
  document.getElementById("display-question").style.display = "none";
  document.getElementById("display-answer").style.display = "block";
};

const addCorrect = () => {
  const currentGame = new GameTracker();
  const currentQuestion = currentGame.getQuestion();
  const { link, about, type } = currentQuestion;
  const amountOfPlayers = currentGame.getCurrentPlayer();
  const correctLink = `
    <p class='helpful-link'>
      <a target="_blank" href='${link}'>
      ${about}
      </a>
    </p>`;

  const currentPlayer = amountOfPlayers === 1 ? "player1" : "player2";

  currentGame.addPoints(currentPlayer);
  currentGame.addCorrect(currentPlayer, correctLink);

  const blocksElement = document.getElementById(
    `${
      amountOfPlayers === 1 ? "player-1" : "player-2"
    }-block-${currentGame.getPoints(currentPlayer)}`
  );

  let images = {
    html: 'url("./images/html-full.png")',
    css: 'url("./images/css-full.png")',
    javascript: 'url("./images/javascript-full.png")',
  }

  blocksElement.style.backgroundImage = images[type];
  blocksElement.style.backgroundSize = "cover";

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
