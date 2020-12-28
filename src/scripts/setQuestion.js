import GameTracker from "../classes/gameTracker";

export default () => {
  const currentGame = new GameTracker();
  const noQuestionsAvailable = currentGame.getQuestions().length === 0;

  if (noQuestionsAvailable) {
    getQuestions();
  } else {
    currentGame.setQuestion();
  }
};
