import GameTracker from "../classes/gameTracker";
import getQuestions from './getQuestions';

export default () => {
  const currentGame = new GameTracker();
  const amountOfQuestions = currentGame.getQuestions().length;
  const noQuestionsAvailable = amountOfQuestions === 0;

  if (noQuestionsAvailable) {
    getQuestions();
  } else {
    currentGame.setQuestion();
  }
};
