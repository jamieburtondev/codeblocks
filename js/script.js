// CONSTANTS
const opacity = "opacity";
const halfOpacity = 0.5;
const fullOpacity = 1;

const html = "html";
const css = "css";
const javascript = "js";

const displayBlock = "block";
const displayNone = "none";

const solo = "#solo";
const versus = "#versus";

const player1 = "#player1";
const player2 = "#player2";

$(document).ready(() => {
  // STORES WHAT CODE TYPES / HOW MANY PLAYERS ARE SELECTED

  const picked = { html: false, css: false, js: false };
  let playerCount = 1;

  // ADJUSTS BUTTON OPACITIES ON CLICK, WHAT CODE TYPES / AMOUNT OF PLAYERS PICKED

  const chooseQuestionType = (type) => {
    const questionTypeUnselected =
      $(`#${type}`).css(opacity) === `${halfOpacity}`;

    picked[type] = questionTypeUnselected ? true : false;
    $(`#${type}`).css(
      opacity,
      questionTypeUnselected ? fullOpacity : halfOpacity
    );
  };

  [html, css, javascript].forEach((type) =>
    $(`#${type}`).css(opacity, halfOpacity)
  );

  [html, css, javascript].forEach((type) =>
    $(`#${type}`).click(() => chooseQuestionType(type))
  );

  [solo, versus].forEach((type) => {
    $(type).click(() => {
      $(type).css("opacity", fullOpacity);
      $(type === solo ? versus : solo).css("opacity", halfOpacity);
      playerCount = type === solo ? 1 : 2;
    });
  });

  // START BUTTON, ASSIGNING VALUES TO LOCAL STORAGE FOR MAIN.HTML'S USE

  $("#start").click(() => {
    const noQuestionSetPicked = !picked.html && !picked.css && !picked.js;
    if (noQuestionSetPicked) {
      alert("You must select at least one set of questions to begin.");
    } else {
      $("#setup").css("display", displayNone);
      $("#game").css("display", displayBlock);
      game();
    }
  });

  // GAME
  const game = () => {
    // ENABLES YOU TO PRESS ENTER TO MOVE BETWEEN (SOME) PAGES
    $(document).keypress((key) => {
      const currentDisplayingQuestion =
        $("#display-question").css("display") === displayBlock;
      const currentlyDisplayingContinue =
        $("#display-answer").css("display") === displayBlock;
      const currentlyDisplayingFinish =
        $("#display-finish").css("display") === displayBlock;

      if (key.which === 13) {
        if (currentDisplayingQuestion) {
          guessPress();
        } else if (currentlyDisplayingContinue) {
          continuePress();
        } else if (currentlyDisplayingFinish) {
          replayPress();
        }
      }
    });

    // TAKES IN QUESTIONS FROM THE JSON FILE

    let questionsArray = [];

    const getQuestions = () => {
      [html, css, javascript].forEach((type) => {
        if (picked[type]) {
          $.getJSON(`/json/${type}.json`, (data) => {
            questionsArray.push(...data.questions);
          });
        }
      });

      setTimeout(() => setQuestion(), 1000);
    };

    getQuestions();

    // KEEPS TRACK OF WHAT TURN IT IS

    let turn = 0;

    // SETS THE PLAYER TO PLAYER 1, CHANGING TO PLAYER 2 LATER IF NEEDED

    let player = player1;
    let playerText = "PLAYER 1";

    // SETS QUESTIONS FOR CODE TYPES SELECTED ON INDEX.HTML

    //VARIABLES USED

    // USED TO SET A RANDOM QUESTION, ITS ANSWER, AND ITS CODE TYPE

    let questionSet;
    let answerSet;
    let typeSet;

    // ARRAY TO ADD USED QUESTIONS TO, USING THE NEWLY PUSHED QUESTION, QUESTIONSUSED[0],
    // AS THE CURRENT QUESTION

    const questionsUsed = [];

    // PICKS RANDOMIZED QUESTION TO USE FROM SELECTED CODE TYPES

    const setQuestion = () => {
      // ONLY WHEN THERE AREN'T ANYMORE QUESTIONS, IT TAKES
      // REPEATS FROM THE JSON FILE

      const noQuestionsAvailable = questionsArray.length === 0;

      if (noQuestionsAvailable) {
        getQuestions();
      } else {
        num = Math.floor(Math.random() * questionsArray.length);
        questionsUsed.unshift(questionsArray[num]);
        questionsArray.splice(num, 1);

        questionSet = questionsUsed[0].question;
        answerSet = questionsUsed[0].answer;
        typeSet = questionsUsed[0].type;
        descriptionSet = questionsUsed[0].description;
        linkSet = questionsUsed[0].link;
        aboutSet = questionsUsed[0].about;
      }
    };

    // SWITCH FROM PLAYER 1/2 BLOCKS PAGE TO THE QUESTION PAGE

    // VARIABLES USED

    // PICKS A COLOR FOR THE QUESTION/ANSWER HEADER BACKGROUND AND THE BLOCKS' IMAGES
    // THAT CORRESPOND TO THE CODE TYPE

    let color;
    let images;

    const questions = () => {
      $("#banner").css("display", displayNone);

      $(".question").css("display", displayBlock);

      // AUTO FOCUSES ON TEXT BOX

      const onDisplayQuestionPage =
        $("#display-question").css("display") == displayBlock;

      if (onDisplayQuestionPage) {
        $("#input-answer").focus();
      }

      $("#question").text(questionSet);

      switch (typeSet) {
        case html:
          color = "#E44D26";
          images = 'url("./images/HTML_Full.png")';
          break;
        case css:
          color = "#0070BA";
          images = 'url("./images/CSS_Full.png")';
          break;
        case "javascript":
          color = "#63A814";
          images = 'url("./images/JavaScript_Full.png")';
          break;
      }

      $("#question-type").text(typeSet.toUpperCase());
      [
        "#question-type",
        "#answer-type",
        "#guess",
        "#continue",
      ].forEach((element) => $(`${element}`).css("background-color", color));
    };

    // BASED ON THE TURN, AND PLAYER COUNT: SETS UP THE BOARD

    const setup = () => {
      const only1Player = playerCount === 1;
      if (only1Player) {
        $("#turn").text("PRACTICE");
      }

      const firstTurn = turn === 0;

      if (firstTurn || only1Player) {
        setTimeout(() => {
          $(player).css("display", displayNone);
        }, 3000);
        setTimeout(questions, 3000);
      } else {
        let setPlayer = () => {
          switch (player) {
            case player1:
              player = player2;
              playerText = "PLAYER 2";
              break;
            case player2:
              player = player1;
              playerText = "PLAYER 1";
              break;
          }
        };

        setTimeout(() => {
          $(player).css("display", displayNone), setPlayer();
        }, 3000);

        setTimeout(() => {
          $(player).css("display", displayBlock);
          $("#turn").text(playerText);
        }, 3000);

        setTimeout(() => {
          $(player).css("display", displayNone);
          questions();
        }, 6000);
      }
    };

    setup();

    // RESULTS PAGE

    const breakdown = () => {
      // TURNS ON/OFF SECTION DISPLAYS PROPERLY

      $(".answer").css("display", displayNone);
      $(player).css("display", displayBlock);
      $("#banner").css("display", displayBlock);

      // CREATES A BANNER FOR WHO WON ("BLOCK COMPLETED" FOR SOLO PLAY)

      $("h1").css("visibility", "hidden");

      if (playerCount === 1) {
        $("#banner").text("BLOCK COMPLETED");
      } else if (player1Points > player2Points) {
        $("#banner").text("PLAYER 1 WINS");
      } else if (player2Points > player1Points) {
        $("#banner").text("PLAYER 2 WINS");
      }

      // AFTER SOME TIME HAS PASSED VIEWING THE WINNING BLOCK AND PLAYER...

      setTimeout(() => {
        $("h1").css("visibility", "visible");

        // TURNS ON/OFF SECTION DISPLAYS PROPERLY

        ["#turn", "#banner", player].forEach((element) =>
          $(`${element}`).css("display", "none")
        );
        $(".finish").css("display", "block");

		// APPENDS ALL THE CORRECT AND INCORRECT ANSWERS TO DISPLAY ON THE RESULTS PAGE

        for (let i = 0; i <= questionsUsed.length; i++) {
          $("#player-1-correct").append(player1CorrectQuestions[i]);
          $("#player-1-incorrect").append(player1IncorrectQuestions[i]);
          $("#player-2-correct").append(player2CorrectQuestions[i]);
          $("#player-2-incorrect").append(player2IncorrectQuestions[i]);
        }

        // CHANGES THE DISPLAY IF SOLO PLAY IS ENABLED (LIKE REMOVING PLAYER 2 CONTENT)

        if (playerCount == 1) {
          $("#player1Finish").text("OVERVIEW");
          [
            "#player-2-finish",
            "#player-2-correct",
            "#player-2-incorrect",
            "#player-2-finish",
          ].forEach((element) => $(`${element}`).css("display", "none"));
        }
      }, 5000);
    };

    // CHECKS IF THERE IS A WINNER BASED ON THE TURN

    let checkWin = () => {
      const ifTie = lastTurn && player1Points === 9 && player2Points === 9;
      const ifWinner =
        (lastTurn && player1Points === 9 && player2Points === 8) ||
        (player2Points === 9 && player1Points !== 9) ||
        (player1Points === 9 && player2Points < 8);
      const ifOneTurnLeft = player1Points === 9 && player2Points === 8;

      if (ifTie) {
        suddenDeath = true;
        turn = 0;
        player1Points = 0;
        player2Points = 0;
      } else if (ifWinner) {
        breakdown();
      } else if (ifOneTurnLeft) {
        lastTurn = true;
      }
    };

    // SWITCHES THE DISPLAY FROM THE QUESTION SECTION TO THE ANSWER SECTION

    const answers = () => {
      $(".question").css("display", displayNone);
      $(".answer").css("display", displayBlock);
    };

    // WHEN GUESS IS CLICKED ON THE ANSWER PAGE: GOES TO REVEAL THE CORRECT ANSWER
    // AND DETERMINE IF THE USER IS CORRECT / INCORRECT

    // VARIABLES

    // WHEN THE CONTINUE BUTTON IS CLICKED LATER, THIS VALUES MAKES SURE THAT THE
    // CURRENT BLOCK ONLY GETS ANIMATED IF IT WAS JUST CORRECTLY ANSWERED AND NOT
    // FOR A TURN OR MULTIPLE TURNS AGO

    let rightAnswer = false;

    const guessPress = () => {
      $("#answer-link").text(aboutSet);
      $("#description").text(descriptionSet);
      $("#answer-link").attr("href", linkSet);
      $("#answer-link").attr("class", "helpfulLink");

      const inputtedAnswer = $("#input-answer").val().toLowerCase();
      const correctAnswer =
        inputtedAnswer === answerSet.toLowerCase() ||
        inputtedAnswer === "cheat";
      const noInputtedAnswer = $("#input-answer").val() === "";

      if (correctAnswer) {
        $("#answer-type").text("CORRECT!");
        rightAnswer = true;
        answers();
        correct();
      } else if (noInputtedAnswer) {
        $("#input-answer").attr("placeholder", "Don't forget to answer!");
      } else {
        $("#answer-type").text("INCORRECT.");
        $("#description").text(descriptionSet);

        const helpfulLink = `<p class='helpfulLink'><a target=\"_blank\" href='${linkSet}'> ${aboutSet} </a></p>`;

        player === player1
          ? player1IncorrectQuestions.push(helpfulLink)
          : player2IncorrectQuestions.push(helpfulLink);

        answers();
        checkWin();
      }
      $("#input-answer").val("");
    };

    $("#guess").click(guessPress);

    // CALLED UPON IF A PLAYER GUESSES AN ANSWER CORRECTLY

    // VARIABLES USED

    // HOW MANY POINTS THE PLAYERS CURRENTLY HAVE, DETERMINING WINNER/LOSER/SUDDEN DEATH

    let player1Points = 0;
    let player2Points = 0;

    // ATTACHES THE POINT VALUE OF THE CURRENT PLAYER TO THIS VARIABLE SO
    // THE CORRECT BLOCK WILL BE MOVED, AND FOR THE RIGHT PLAYER, AFTER CONTINUE IS PRESSED

    let currentPlayer;

    // USED TO STORE THE CURRENT BLOCK FOR PLAYER 1 OR 2 TO BE MANIPULATED

    let blocks;

    // HELPS FIGURE OUT WHICH BLOCK SHOULD BE MANIPULATED

    let player1Blocks = 1;
    let printPlayer1Blocks = "#player-1-block-" + player1Blocks;
    let player2Blocks = 1;
    let printPlayer2Blocks = "#player-2-block-" + player2Blocks;

    // ARRAYS HOLDING ON TO CORRECT/INCORRECT CHOICES BY PLAYERS TO SHOW IN RESULTS PAGE

    const player1CorrectQuestions = [];
    const player1IncorrectQuestions = [];

    const player2CorrectQuestions = [];
    const player2IncorrectQuestions = [];

    const correct = () => {
      const helpfulLink =
        "<p class='helpfulLink'><a target=\"_blank\" href='" +
        linkSet +
        "'>" +
        aboutSet +
        "</a></p>";

      const currentPlayerIs1 = player === player1;
      const currentPlayerIs2 = player === player2;

      if (currentPlayerIs1) {
        blocks = printPlayer1Blocks;
        player1Points++;
        player1CorrectQuestions.push(helpfulLink);
        currentPlayer = player1Points;
        player1Blocks++;
        printPlayer1Blocks = "#player-1-block-" + player1Blocks;
      } else if (currentPlayerIs2) {
        blocks = printPlayer2Blocks;
        player2Points++;
        player2CorrectQuestions.push(helpfulLink);
        currentPlayer = player2Points;
        player2Blocks++;
        printPlayer2Blocks = "#player-2-block-" + player2Blocks;
      }

      $(blocks).css("background-image", images);
      $(blocks).css("background-size", "cover");

        checkWin();
    };

    // CHECKS TO SEE IF THERE IS A WINNER ON THIS TURN

    // VARIABLES USED

    // SET TO 1 IF PLAYER 1 COMPLETES THE BLOCK AND PLAYER 2 HAS A CHANCE TO AS WELL ON
    // THE NEXT TURN, GIVING EACH PLAYER AN EQUAL SHOT TO WIN

    let lastTurn = false;

    // SET TO 1 IF EACH PLAYER HAS THE SAME AMOUNT OF POINTS AT THE END OF THE GAME OR
    // DURING SUDDEN DEATH, TAKING PLACE AFTER THAT OUTCOME

    let suddenDeath = false;

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

        $(blocks).animate({ [move]: "-=800px" }, 0);
        $(blocks).animate({ [move]: "+=400px" }, 750, "linear");
        $(blocks).animate({ [move]: "+=400px" }, 750, "linear");

        rightAnswer = false;
      }

      // IF IT'S SUDDEN DEATH, IT WILL SAY SO AND THEN GO TO SET UP ANOTHER QUESTION
      // UNLESS A PLAYER WINS AND THEN IT SENDS THE PLAYER OVER TO THE RESULTS PAGE

      const nextTurn = () => {
        turn++;
        $(".answer").css("display", displayNone);
        $(player).css("display", displayBlock);
        setQuestion();
        setup();
      };

      if (suddenDeath) {
        $("#banner").css("display", displayBlock);
        $("#banner").text("SUDDEN DEATH");
        if (
          (turn % 2 === 0 && player1Points > player2Points) ||
          (turn % 2 === 0 && player2Points > player1Points)
        ) {
          breakdown();
        } else {
          nextTurn();
        }
      }

      nextTurn();
    };

    // WHEN CONTINUE IS PRESSED ON THE ANSWERS SCREEN...

    $("#continue").click(continuePress);

    // WHEN REPLAY IS CLICKED, IT RESETS ALL OF THE CONTENT TO SET UP A NEW GAME AND CHANGES DISPLAYS

    const replayPress = () => {
      $(".finish").css("display", displayNone);

      player1CorrectQuestions = [];
      player1IncorrectQuestions = [];
      player2CorrectQuestions = [];
      player2IncorrectQuestions = [];
      player1Points = 0;
      player2Points = 0;
      currentPlayer = 0;
      lastTurn = false;
      suddenDeath = false;
      player1Blocks = 1;
      player2Blocks = 1;
      printPlayer1Blocks = "#player-1-block-" + player1Blocks;
      printPlayer2Blocks = "#player-2-block-" + player2Blocks;
      turn = 0;
      player = player1;

      $(".color-block").css("background-image", "none");
      $(`${player1}`).css("display", displayBlock);
      $("#turn").css("display", displayBlock);
      $("#turn").text("PLAYER 1");

      setup();
    };

    $("#replay").click(replayPress);
  };
});
