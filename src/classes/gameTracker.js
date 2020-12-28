import HTML from '../json/html.json';
import CSS from '../json/css.json';
import JS from '../json/js.json';
import QuestionSet from './questionSet';
class GameTracker {
  constructor() {
    if (GameTracker.instance) {
      return GameTracker.instance;
    }

    this.currentPlayer = 1;
    this.players = 1;

    this.questions = [];

    this.questionsUsed = [];

    this.allQuestions = {
      html: HTML.questions,
      css: CSS.questions,
      js: JS.questions,
    };

    this.turn = 0;
    this.picked = {
      html: false,
      css: false,
      js: false
    };

    this.points = {
      player1: 0,
      player2: 0,
    };

    this.blocks = {
      player1: 1,
      player2: 1,
    };

    this.correct = {
      player1: [],
      player2: [],
    };

    this.incorrect = {
      player1: [],
      player2: [],
    };

    this.lastTurn = false;
    this.suddenDeath = false;
    this.rightAnswer = false;
    this.currentQuestion = null;

    GameTracker.instance = this;
  }

  getCurrentPlayer() {
    return this.currentPlayer;
  }

  setCurrentPlayer(num) {
    this.currentPlayer = num;
  }

  isLastTurn() {
    return this.lastTurn;
  }

  isRightAnswer() {
    return this.rightAnswer;
  }

  setRightAnswer(bool) {
    this.rightAnswer = bool;
  }

  getPlayers() {
    return this.players;
  }

  changePlayer(num) {
    this.players = num;
  }

  addQuestions(type) {
    this.questions = this.questions.concat(this.allQuestions[type]);
  }

  getQuestions() {
    return this.questions;
  }

  getQuestion() {
    return this.currentQuestion;
  }

  setQuestion() {
    const num = Math.floor(Math.random() * this.questions.length);
    this.questionsUsed.unshift(this.questions[num]);
    const question = this.questions.splice(num, 1)[0];
    this.currentQuestion = new QuestionSet(question);
    return this.currentQuestion;
  }

  getUsedQuestions() {
    return this.questionsUsed;
  }

  getCorrectQuestions(player) {
    return this.correct[player];
  }

  getIncorrectQuestions(player) {
    return this.incorrect[player];
  }

  getPicked(type) {
    return this.picked[type];
  }

  setPicked(type) {
    this.picked[type] = !this.picked[type];
  }

  addCorrect(player, data) {
    this.correct[player].push(data);
  }

  getBlocks(player) {
    return this.correct[player].length - 1;
  }

  addIncorrect(player, data) {
    this.correct[player].push(data);
  }

  addPoints(player) {
    this.points[player] += 1;
  }

  resetPoints() {
    this.points = {
      player1: 0,
      player2: 0,
    };
  }

  getPoints(player) {
    return this.points[player];
  }

  addBlocks(player) {
    this.points[player] += 1;
  }

  addTurn() {
    this.turn += 1;
  }

  getTurn() {
    return this.turn;
  }

  resetTurns() {
    this.turn = 0;
  }

  resetAll() {
    this.resetTurns();
    this.lastTurn = false;
    this.suddenDeath = false;
    this.points = {
      player1: 0,
      player2: 0,
    };
    this.correct = {
      player1: [],
      player2: [],
    };
    this.incorrect = {
      player1: [],
      player2: [],
    };
  }

  isSuddenDeath() {
    return this.suddenDeath;
  }

  makeSuddenDeath() {
    this.suddenDeath = true;
  }

  makeLastTurn() {
    this.lastTurn = true;
  }
}

export default GameTracker;
