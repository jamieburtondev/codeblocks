import GameTracker from "../classes/gameTracker";
import getQuestions from "./getQuestions";

const questions = () => {
  const currentGame = new GameTracker();
  const currentQuestion = currentGame.getQuestion();
  const { question, type } = currentQuestion;
  const bannerElement = document.getElementById("banner");
  const questionElement = document.querySelector(".question");
  const questionContentElement = document.getElementById("question");

  bannerElement.style.display = "none";
  questionElement.style.display = "block";
  questionContentElement.textContent = question;

  let color;

  switch (type) {
    case "html":
      color = "#E44D26";
      break;
    case "css":
      color = "#0070BA";
      break;
    case "javascript":
      color = "#63A814";
      break;
  }

  document.getElementById("question-type").textContent = type.toUpperCase();

  ["question-type", "answer-type", "guess", "continue"].forEach(
    (element) =>
      (document.getElementById(element).style.backgroundColor = color)
  );
};

export default () => {
  const currentGame = new GameTracker();
  const currentTurn = currentGame.getTurn();
  const currentPlayer = currentGame.getCurrentPlayer();
  const currentPlayerElement = document.getElementById(
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
    let setPlayer = () => {
      switch (currentPlayer) {
        case 1:
          currentGame.setCurrentPlayer(2);
          break;
        case 2:
          currentGame.setCurrentPlayer(1);
          break;
      }
    };

    setTimeout(() => {
      currentPlayerElement.style.display = "none";
      setPlayer();
    }, 3000);

    setTimeout(() => {
      currentPlayerElement.style.display = "block";
      turnElement.textContent = `PLAYER ${currentPlayer}`;
    }, 3000);

    setTimeout(() => {
      currentPlayerElement.style.display = "none";
      questions();
    }, 6000);
  }
};
