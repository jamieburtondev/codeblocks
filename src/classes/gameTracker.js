import HTML from '../json/html.json';
import CSS from '../json/css.json';
import JS from '../json/js.json';
class GameTracker {
  constructor() {
    this.currentPlayer = 1;
    this.players = 1;

    this.questions = [];

    this.usedQuestions = [];

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
  }

  isLastTurn() {
    return this.lastTurn;
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
    console.log(this.questions.length);
    const num = Math.floor(Math.random() * this.questions.length);
    this.usedQuestions.unshift(this.questions[num]);
    const question = this.questions.splice(num, 1)[0];
    console.log(this.questions.length);
    return question;
  }

  getPicked(type) {
    return this.picked[type];
  }

  setPicked(type) {
    this.picked[type] = !this.picked[type];
  }

  addCorrect(player, data) {
    console.log('player', player);
    console.log('data', data);
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
    console.log('player', player, typeof player);
    console.log('this.points', this.points);
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
