import GameTracker from "../classes/gameTracker";
import getQuestions from "./getQuestions";

const questions = () => {
  const currentGame = new GameTracker();
  const currentQuestion = currentGame.getQuestion();
  const { question, type } = currentQuestion;
  const bannerElement = document.getElementById("banner");
  const displayQuestionElement = document.getElementById("display-question");
  const questionContentElement = document.getElementById("question");
  const questionTypeHeader = document.getElementById("question-type");

  const questionType = document.createElement('span');
  questionType.classList.add('screen-reader');
  questionType.textContent = `${type} question`;

  bannerElement.style.display = "none";
  displayQuestionElement.style.display = "block";
  questionContentElement.textContent = question;
  questionContentElement.insertBefore(questionType, questionContentElement.firstChild);
  questionContentElement.setAttribute('aria-live', 'polite');

  let color = {
    html: "#E44D26",
    css: "#0070BA",
    javascript: "#63A814",
  };

  questionTypeHeader.textContent = type.toUpperCase();
  questionTypeHeader.setAttribute('aria-label', `${type} question`);

  ["question-type", "answer-type", "guess", "continue"].forEach(
    (element) =>
      (document.getElementById(element).style.backgroundColor = color[type])
  );
};

export default () => {
  const currentGame = new GameTracker();
  const currentTurn = currentGame.getTurn();
  let currentPlayer = currentGame.getCurrentPlayer();
  let currentPlayerElement = document.getElementById(
    `player${currentPlayer}`
  );
  const turnElement = document.getElementById("turn");

  getQuestions();

  const only1Player = currentGame.getPlayers() === 1;
  if (only1Player) {
    turnElement.textContent = "PRACTICE";
  }

  const firstTurn = currentTurn === 0;

  if (firstTurn || only1Player) {
    setTimeout(() => {
      currentPlayerElement.style.display = "none";
    }, 3000);
    setTimeout(questions, 3000);
  } else {

    setTimeout(() => {
      currentPlayerElement.style.display = "none";
      currentPlayer === 1 ? currentGame.setCurrentPlayer(2) : currentGame.setCurrentPlayer(1);
      currentPlayer = currentGame.getCurrentPlayer();
      currentPlayerElement =  document.getElementById(
        `player${currentPlayer}`
      );
      currentPlayerElement.style.display = "flex";
      turnElement.textContent = `PLAYER ${currentPlayer}`;
    }, 3000);

    setTimeout(() => {
      currentPlayerElement.style.display = "none";
      questions();
    }, 6000);
  }
};
