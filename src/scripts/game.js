import GameTracker from "../classes/gameTracker";

document.addEventListener("DOMContentLoaded", () => {
  const currentGame = new GameTracker();

  let player = player1;

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
      currentGame.setQuestion();
    }
  };

  const questions = () => {
    document.getElementById("banner").style.display = "none";
    document.querySelector(".question").style.display = "block";
    document.getElementById("question").textContent = currentGame.getQuestion().question;

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

  const setup = () => {
    getQuestions();

    const only1Player = currentGame.getPlayers() === 1;
    if (only1Player) {
      document.getElementById("turn").textContent = "PRACTICE";
    }

    const firstTurn = currentGame.getTurn() === 0;

    if (firstTurn || only1Player) {
      setTimeout(() => {
        player.style.display = "none";
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
        document.getElementById(player.getAttribute('id')).style.display = "none";
        setPlayer();
      }, 3000);

      setTimeout(() => {
        document.getElementById(player.getAttribute('id')).style.display = "block";
        document.getElementById("turn").textContent = `PLAYER ${player}`;
      }, 3000);

      setTimeout(() => {
        document.getElementById(player.getAttribute('id')).style.display = "none";
        questions();
      }, 6000);
    }
  };

  const breakdown = () => {
    document.querySelector(".answer").style.display = "none";
    document.getElementById(player.getAttribute('id')).style.display = "block";
    document.getElementById("banner").style.display = "block";
    document.querySelector("h1").style.visibility = "hidden";

    if (currentGame.getPlayers() === 1) {
      document.getElementById("banner").textContent = "BLOCK COMPLETED";
    } else if (player1Points > player2Points) {
      document.getElementById("banner").textContent = "PLAYER 1 WINS";
    } else if (player2Points > player1Points) {
      document.getElementById("banner").textContent = "PLAYER 2 WINS";
    }

    setTimeout(() => {
      document.querySelector("h1").style.visibility = "visible";

      ["turn", "banner", player.getAttribute('id')].forEach(
        (element) => (document.getElementById(element).style.display = "none")
      );

      document.querySelector(".finish").style.display = "block";

      // APPENDS ALL THE CORRECT AND INCORRECT ANSWERS TO DISPLAY ON THE RESULTS PAGE

      // for (let i = 0; i <= questionsUsed.length; i++) {
      //   $("#player-1-correct").append(player1CorrectQuestions[i]);
      //   $("#player-1-incorrect").append(player1IncorrectQuestions[i]);
      //   $("#player-2-correct").append(player2CorrectQuestions[i]);
      //   $("#player-2-incorrect").append(player2IncorrectQuestions[i]);
      // }

      if (currentGame.getPlayers() === 1) {
        document.getElementById("player1Finish").textContent = "OVERVIEW";
        [
          "player-2-finish",
          "player-2-correct",
          "player-2-incorrect",
          "player-2-finish",
        ].forEach(
          (element) =>
            (document.getElementById(element).style.display = "block")
        );
      }
    }, 5000);
  };

  let checkWin = () => {
    const player1Points = currentGame.getPoints("player1");
    let player2Points =
      currentGame.getPlayers() === 2 ? currentGame.getPoints("player2") : null;

    const tieGame =
      currentGame.isLastTurn() && player1Points === 9 && player2Points === 9;
    const winner =
      (currentGame.isLastTurn() &&
        player1Points === 9 &&
        player2Points === 8) ||
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
    document.getElementById("answer-link").textContent = currentGame.getQuestion().about;
    document.getElementById("description").textContent =
      currentGame.getQuestion().description;
    document.getElementById("description").textContent =
      currentGame.getQuestion().description;
    document
      .getElementById("answer-link")
      .setAttribute("href", currentGame.getQuestion().link);
    document
      .getElementById("answer-link")
      .setAttribute("class", "helpful-link");

    const inputtedAnswer = document
      .getElementById("input-answer")
      .value.toLowerCase();
    const correctAnswer =
      inputtedAnswer === currentGame.getQuestion().answer.toLowerCase() ||
      inputtedAnswer === "cheat";
    const noInputtedAnswer =
      document.getElementById("input-answer").value === "";

    if (correctAnswer) {
      document.getElementById("answer-type").textContent = "CORRECT!";
      currentGame.setRightAnswer(true);
      answers();
      correct();
    } else if (noInputtedAnswer) {
      document
        .getElementById("input-answer")
        .setAttribute("placeholder", "Don't forget to answer!");
    } else {
      document.getElementById("answer-type").textContent = "INCORRECT";
      document.getElementById("description").textContent =
        currentGame.getQuestion().description;

      const helpfulLink = `<p class='helpful-link'><a target=\"_blank\" href='${currentGame.getQuestion().link}'> ${currentGame.getQuestion().about} </a></p>`;

      currentGame.addIncorrect(player(player.getAttribute('id'))).push(helpfulLink);
      answers();
      checkWin();
    }
    document.getElementById("input-answer").value = "";
  };

  document.getElementById("guess").addEventListener("click", guessPress);

  const correct = () => {
    const helpfulLink = `
    <p class='helpful-link'>
      <a target=\"_blank\" href='${currentGame.getQuestion().link}'>
      ${currentGame.getQuestion().about}
      </a>
    </p>`;

    const currentPlayer = player === player1 ? "player1" : "player2";

    currentGame.addPoints(currentPlayer);
    currentGame.addCorrect(currentPlayer, helpfulLink);

    const blocks = document.getElementById(
      `${
        player === player1 ? "player-1" : "player-2"
      }-block-${currentGame.getPoints(currentPlayer)}`
    );

    let images;

    switch (currentGame.getQuestion().type) {
      case "html":
        images = 'url("./images/html-full.png")';
        break;
      case "css":
        images = 'url("./images/css-full.png")';
        break;
      case "javascript":
        images = 'url("./images/javascript-full.png")';
        break;
    }

    blocks.style.backgroundImage = images;
    blocks.style.backgroundSize = "cover";

    checkWin();
  };

  const continuePress = () => {
    const points = currentGame.getPoints(player === player1 ? "player1" : "player2");

    const animateBlockInFromLeft =
      points === 1 || points === 4 || points === 7;
    const animateBlockInFromTop =
      points === 2 || points === 5 || points === 8;
    const animateBlockInFromRight =
      points === 3 || points === 6 || points === 9;

    if (currentGame.isRightAnswer()) {
      let move;
      if (animateBlockInFromLeft) {
        move = "left";
      } else if (animateBlockInFromTop) {
        move = "top";
      } else if (animateBlockInFromRight) {
        move = "right";
      }

      const blocks = `${
        player === player1 ? "player-1" : "player-2"
      }-block-${points}`;

      $(`#${blocks}`).animate({ [move]: "-=800px" }, 0);
      $(`#${blocks}`).animate({ [move]: "+=400px" }, 750, "linear");
      $(`#${blocks}`).animate({ [move]: "+=400px" }, 750, "linear");

      currentGame.setRightAnswer(false);
    }

    const nextTurn = () => {
      currentGame.addTurn();
      document.querySelector('.answer').style.display = 'none';
      document.getElementById(player.getAttribute('id')).style.display = 'block';
      setQuestion();
      setup();
    };

    if (currentGame.isSuddenDeath()) {
      document.getElementById('banner').style.display = 'block';
      document.getElementById('banner').textContent = 'SUDDEN DEATH';

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

  const replayGame = () => {
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
  document.getElementById("replay").addEventListener("click", replayGame);
});
