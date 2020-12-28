import GameTracker from "../classes/gameTracker";
import setQuestion from "./setQuestion";

const getQuestions = () => {
  const currentGame = new GameTracker();

  ["html", "css", "javascript"].forEach((type) => {
    if (currentGame.getPicked(type)) {
      currentGame.addQuestions(type);
    }
  });

  setQuestion();
};

const questions = () => {
  const currentGame = new GameTracker();
  document.getElementById("banner").style.display = "none";
  document.querySelector(".question").style.display = "block";
  document.getElementById(
    "question"
  ).textContent = currentGame.getQuestion().question;

  let color;

  switch (currentGame.getQuestion().type) {
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

  document.getElementById(
    "question-type"
  ).textContent = currentGame.getQuestion().type.toUpperCase();

  ["question-type", "answer-type", "guess", "continue"].forEach(
    (element) =>
      (document.getElementById(element).style.backgroundColor = color)
  );
};

export default () => {
  const currentGame = new GameTracker();
  getQuestions();

  const only1Player = currentGame.getPlayers() === 1;
  if (only1Player) {
    document.getElementById("turn").textContent = "PRACTICE";
  }

  const firstTurn = currentGame.getTurn() === 0;

  if (firstTurn || only1Player) {
    setTimeout(() => {
      document.getElementById(
        `player${currentGame.getCurrentPlayer()}`
      ).style.display = "none";
    }, 3000);
    setTimeout(questions, 3000);
  } else {
    let setPlayer = () => {
      switch (currentGame.getCurrentPlayer()) {
        case 1:
          currentGame.setCurrentPlayer(2);
          break;
        case 2:
          currentGame.setCurrentPlayer(1);
          break;
      }
    };

    setTimeout(() => {
      document.getElementById(
        `player${currentGame.getCurrentPlayer()}`
      ).style.display = "none";
      setPlayer();
    }, 3000);

    setTimeout(() => {
      document.getElementById(
        `player${currentGame.getCurrentPlayer()}`
      ).style.display = "block";
      document.getElementById(
        "turn"
      ).textContent = `PLAYER ${currentGame.getCurrentPlayer()}`;
    }, 3000);

    setTimeout(() => {
      document.getElementById(
        `player${currentGame.getCurrentPlayer()}`
      ).style.display = "none";
      questions();
    }, 6000);
  }
};
