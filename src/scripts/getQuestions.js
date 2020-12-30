import GameTracker from '../classes/gameTracker';
import setQuestion from './setQuestion';

export default  () => {
  const currentGame = new GameTracker();

  ["html", "css", "js"].forEach((type) => {
    if (currentGame.getPicked(type)) {
      currentGame.addQuestions(type);
    }
  });

  setQuestion();
};
