import GameTracker from "../classes/gameTracker";
import QuestionSet from "../classes/questionSet";

document.addEventListener("DOMContentLoaded", () => {
  const currentGame = new GameTracker();

  let player = player1;

  const questionsUsed = [];

  let currentQuestion;

  let color;
  let images;

  let rightAnswer = false;

  let currentPlayer;
  let blocks;

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

  const getQuestions = () => {
    ["html", "css", "javascript"].forEach((type) => {
      if (currentGame.getPicked(type)) {
        currentGame.addQuestions(type);
      }
    });

    setQuestion();
  };

  const setQuestion = () => {
    const noQuestionsAvailable = currentGame.getQuestions().length === 0;

    if (noQuestionsAvailable) {
      getQuestions();
    } else {
      currentQuestion = currentGame.getQuestion();
    }
  };

  const questions = () => {
    document.getElementById("banner").style.display = "none";
    document.querySelector(".question").style.display = "block";
    document.getElementById("question").textContent = currentQuestion.question;

    switch (currentQuestion.type) {
      case "html":
        color = "#E44D26";
        images = 'url("./images/html-full.png")';
        break;
      case "css":
        color = "#0070BA";
        images = 'url("./images/css-full.png")';
        break;
      case "javascript":
        color = "#63A814";
        images = 'url("./images/javascript-full.png")';
        break;
    }

    document.getElementById(
      "question-type"
    ).textContent = currentQuestion.type.toUpperCase();

    [
      "question-type",
      "answer-type",
      "guess",
      "continue",
    ].forEach((element) => document.getElementById(element).style.backgroundColor = color);
  }

  const setup = () => {
    getQuestions();

    const only1Player = currentGame.getPlayers() === 1;
    if (only1Player) {
      document.getElementById("turn").textContent = "PRACTICE";
    }

    const firstTurn = currentGame.getTurn() === 0;

    if (firstTurn || only1Player) {
      setTimeout(() => {
        player.style.display = 'none';
      }, 3000);
      setTimeout(questions, 3000);
    } else {
      let setPlayer = () => {
        switch (player) {
          case player1:
            player = player2;
            break;
          case player2:
            player = player1;
            break;
        }
      };

      setTimeout(() => {
        document.getElementById(player).style.display = 'none';
        setPlayer();
      }, 3000);

      setTimeout(() => {
        document.getElementById(player).style.display = 'block';
        document.getElementById('turn').textContent = `PLAYER ${player}`;
      }, 3000);

      setTimeout(() => {
        document.getElementById(player).style.display = 'none';
        questions();
      }, 6000);
    }
  };

  const breakdown = () => {
    document.querySelector(".answer").style.display = "none";
    document.getElementById(player).style.display = 'block';
    document.getElementById("banner").style.display = "block";
    document.querySelector("h1").style.visibility = "hidden";

    if (currentGame.getPlayers() === 1) {
      document.getElementById("banner").textContent = "BLOCK COMPLETED";
    } else if (player1Points > player2Points) {
      document.getElementById("banner").textContent = "PLAYER 1 WINS";
    } else if (player2Points > player1Points) {
      document.getElementById("banner").textContent = "PLAYER 2 WINS";
    }

    // AFTER SOME TIME HAS PASSED VIEWING THE WINNING BLOCK AND PLAYER...

    setTimeout(() => {
      document.querySelector("h1").style.visibility = "visible";

      // TURNS ON/OFF SECTION DISPLAYS PROPERLY

      ["turn", "banner", player].forEach((element) => document.getElementById(element).style.display = 'none');

      document.querySelector(".finish").style.display = "block";

      // APPENDS ALL THE CORRECT AND INCORRECT ANSWERS TO DISPLAY ON THE RESULTS PAGE

      // for (let i = 0; i <= questionsUsed.length; i++) {
      //   $("#player-1-correct").append(player1CorrectQuestions[i]);
      //   $("#player-1-incorrect").append(player1IncorrectQuestions[i]);
      //   $("#player-2-correct").append(player2CorrectQuestions[i]);
      //   $("#player-2-incorrect").append(player2IncorrectQuestions[i]);
      // }

      // CHANGES THE DISPLAY IF SOLO PLAY IS ENABLED (LIKE REMOVING PLAYER 2 CONTENT)

      if (currentGame.getPlayers() === 1) {
        document.getElementById('player1Finish').textContent = 'OVERVIEW';
        [
          "player-2-finish",
          "player-2-correct",
          "player-2-incorrect",
          "player-2-finish",
        ].forEach((element) => document.getElementById(element).style.display = 'block');
      }
    }, 5000);
  };

  let checkWin = () => {
    const player1Points = currentGame.getPoints("player1");
    let player2Points = currentGame.getPlayers() === 2 ? currentGame.getPoints("player2") : null;

    const tieGame = currentGame.isLastTurn() && player1Points === 9 && player2Points === 9;
    const winner =
      (currentGame.isLastTurn() && player1Points === 9 && player2Points === 8) ||
      (player2Points === 9 && player1Points !== 9) ||
      (player1Points === 9 && player2Points < 8);
    const oneTurnLeft = player1Points === 9 && player2Points === 8;

    if (tieGame) {
      currentGame.makeSuddenDeath();
      currentGame.resetTurns();
      currentGame.resetPoints();
    } else if (winner) {
      breakdown();
    } else if (oneTurnLeft) {
      currentGame.makeLastTurn();
    }
  };

  const answers = () => {
    document.querySelector(".question").style.display = "none";
    document.querySelector(".answer").style.display = "block";
  };

  const guessPress = () => {
    document.getElementById("answer-link").textContent = currentQuestion.about;
    document.getElementById("description").textContent =
      currentQuestion.description;
      document.getElementById('description').textContent = currentQuestion.description;
    document.getElementById('answer-link').setAttribute('href', currentQuestion.link);
    document.getElementById('answer-link').setAttribute('class', 'helpful-link');

    const inputtedAnswer = document.getElementById('input-answer').value.toLowerCase();
    const correctAnswer =
      inputtedAnswer === currentQuestion.answer.toLowerCase() ||
      inputtedAnswer === "cheat";
    const noInputtedAnswer = document.getElementById('input-answer').value === "";

    if (correctAnswer) {
      document.getElementById("answer-type").textContent = "CORRECT!";
      rightAnswer = true;
      answers();
      correct();
    } else if (noInputtedAnswer) {
      document
        .getElementById("input-answer")
        .setAttribute("placeholder", "Don't forget to answer!");
    } else {
      document.getElementById("answer-type").textContent = "INCORRECT";
      document.getElementById("description").textContent =
        currentQuestion.description;

      const helpfulLink = `<p class='helpful-link'><a target=\"_blank\" href='${currentQuestion.link}'> ${currentQuestion.about} </a></p>`;

      player === player1
        ? player1IncorrectQuestions.push(helpfulLink)
        : player2IncorrectQuestions.push(helpfulLink);

      answers();
      checkWin();
    }
    document.getElementById('input-answer').value = '';
  };

  document.getElementById("guess").addEventListener("click", guessPress);

  const correct = () => {
    const helpfulLink = `
    <p class='helpful-link'>
      <a target=\"_blank\" href='${currentQuestion.link}'>
      ${currentQuestion.about}
      </a>
    </p>`;

    const currentPlayer = player === player1 ? "player1" : "player2";

    currentGame.addPoints(currentPlayer);
    currentGame.addCorrect(currentPlayer, helpfulLink);

    const blocks = document.getElementById(`${player === player1 ? "player-1" : "player-2"}-block-${currentGame.getPoints(currentPlayer)}`);

    blocks.style.backgroundImage = images;
    blocks.style.backgroundSize = 'cover';

    checkWin();
  };

  const continuePress = () => {
    // // IF THE ANSWER IS CORRECT, THE NEWLY FILLED IN BLOCK WILL ANIMATE PROPERLY

    const animateBlockInFromLeft =
      currentPlayer === 1 || currentPlayer === 4 || currentPlayer === 7;
    const animateBlockInFromTop =
      currentPlayer === 2 || currentPlayer === 5 || currentPlayer === 8;
    const animateBlockInFromRight =
      currentPlayer === 3 || currentPlayer === 6 || currentPlayer === 9;

    if (rightAnswer) {
      let move;
      if (animateBlockInFromLeft) {
        move = "left";
      } else if (animateBlockInFromTop) {
        move = "top";
      } else if (animateBlockInFromRight) {
        move = "right";
      }

      console.log('blocks', blocks);

      $(blocks).animate({ [move]: "-=800px" }, 0);
      $(blocks).animate({ [move]: "+=400px" }, 750, "linear");
      $(blocks).animate({ [move]: "+=400px" }, 750, "linear");

      rightAnswer = false;
    }

    // IF IT'S SUDDEN DEATH, IT WILL SAY SO AND THEN GO TO SET UP ANOTHER QUESTION
    // UNLESS A PLAYER WINS AND THEN IT SENDS THE PLAYER OVER TO THE RESULTS PAGE

    const nextTurn = () => {
      currentGame.addTurn();
      $(".answer").css("display", "none");
      $(player).css("display", "block");
      setQuestion();
      setup();
    };

    if (currentGame.isSuddenDeath()) {
      $("#banner").css("display", "block");
      $("#banner").text("SUDDEN DEATH");
      if (
        (currentGame.getTurn() % 2 === 0 &&
          currentGame.getPoints("player1") >
            currentGame.getPoints("player2")) ||
        (currentGame.getTurn() % 2 === 0 &&
          currentGame.getPoints("player2") > currentGame.getPoints("player1"))
      ) {
        breakdown();
      } else {
        nextTurn();
      }
    }

    nextTurn();
  };

  const replayPress = () => {
    document.querySelector(".finish").style.display = "none";
    currentGame.resetTurns();
    player = player1;
    document.querySelector(".color-block").style.backgroundImage = "none";
    $(player1).css("display", "block");
    document.getElementById("turn").style.display = "block";
    document.getElementById("turn").textContent = "PLAYER 1";

    setup();
  };

  document.getElementById("continue").addEventListener("click", continuePress);
  document.getElementById("replay").addEventListener("click", replayPress);
});
