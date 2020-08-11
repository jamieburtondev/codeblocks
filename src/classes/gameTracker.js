class GameTracker {
  constructor() {
    this.questions = [];
    this.turn = 0;
    this.points = {
        player1: 0,
        player2: 0
    }

    this.blocks = {
        player1: 1,
        player2: 1
    }
  }

  addPoints(player) {
      this.points[player] += 1;
  }

  addBlocks(player) {
      this.points[player] +=1;
  }

  addTurn() {
      this.turn += 1;
  }

  resetTurns() {
    this.turn = 0;
  }

  resetAll() {
      this.resetTurns();
  }
}

module.exports = GameTracker;
