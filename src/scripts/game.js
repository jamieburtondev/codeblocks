import GameTracker from "../classes/gameTracker";
import setup from './setup';
import continueGame from './continueGame';
import replayGame from './replayGame';
import guessPress from './guessPress';

document.addEventListener("DOMContentLoaded", () => {
  const currentGame = new GameTracker();

  const chooseQuestionType = (type) => {
    currentGame.setPicked(type);
    const picked = currentGame.getPicked(type);

    document.getElementById(type).style.opacity = picked ? 1 : 0.5;
  };

  ["html", "css", "js"].forEach((type) => {
    document
      .getElementById(type)
      .addEventListener("click", () => chooseQuestionType(type));
  });

  ["solo", "versus"].forEach((type) => {
    document.getElementById(type).addEventListener("click", () => {
      const isSolo = type === "solo";
      document.getElementById(type).style.opacity = 1;
      const otherType = isSolo ? "versus" : "solo";
      document.getElementById(otherType).style.opacity = 0.5;
      currentGame.changePlayer(isSolo ? 1 : 2);
    });
  });

  document.getElementById("start").addEventListener("click", () => {
    const noQuestionSetPicked =
      !currentGame.getPicked("html") &&
      currentGame.getPicked("css") &&
      !currentGame.getPicked("js");
    if (noQuestionSetPicked) {
      alert("You must select at least one set of questions to begin.");
    } else {
      document.getElementById("setup").style.display = "none";
      document.getElementById("game").style.display = "block";
      setup();
    }
  });


  document.getElementById("guess").addEventListener("click", guessPress);
  document.getElementById("continue").addEventListener("click", continueGame);
  document.getElementById("replay").addEventListener("click", replayGame);
});
