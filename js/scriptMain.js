$(document).ready(function(){

// ENABLES YOU TO PRESS ENTER TO MOVE BETWEEN (SOME) PAGES

$(document).keypress(function(key) {
	if(key.which == 13 && document.getElementById("displayQuestion").style.display == "block") {
	guessPress();
		
	} else if (key.which == 13 && document.getElementById("displayAnswer").style.display == "block") {
	continuePress();

	} else if (key.which == 13 && document.getElementById("displayFinish").style.display == "block") {
	replayPress();
	}
})

// TAKES IN QUESTIONS FROM THE JSON FILE

getQuestions();

var questionsArray = [];

function getQuestions() {
	$.getJSON("questions.json", function(data) { // pass in the URL (whether remote or local, in this case)

		if (localStorage.html == 1) {
			for (i = 0; i < data.questions.length; i++) {
				if (data.questions[i].type == "html") {
					questionsArray.push(data.questions[i]);
				}
			}
		}

	if (localStorage.css == 1) {
		for (i = 0; i < data.questions.length; i++) {
			if (data.questions[i].type == "css") {
				questionsArray.push(data.questions[i]);
			}
		}
	}

	if (localStorage.javascript == 1) {
		for (i = 0; i < data.questions.length; i++) {
			if (data.questions[i].type == "javascript") {
				questionsArray.push(data.questions[i]);
			}
		}
	}
	}).done(function() {
		setQuestion();
	})
}


// KEEPS TRACK OF WHAT TURN IT IS

var turn = 0;

// SETS THE PLAYER TO PLAYER 1, CHANGING TO PLAYER 2 LATER IF NEEDED

var player = "#player1";


// SETS QUESTIONS FOR CODE TYPES SELECTED ON INDEX.HTML

	//VARIABLES USED

		// USED TO SET A RANDOM QUESTION, ITS ANSWER, AND ITS CODE TYPE

			var questionSet;
			var answerSet;
			var typeSet;

		// ARRAY TO ADD USED QUESTIONS TO, USING THE NEWLY PUSHED QUESTION, QUESTIONSUSED[0],
		// AS THE CURRENT QUESTION

			var questionsUsed = [];

// PICKS RANDOMIZED QUESTION TO USE FROM SELECTED CODE TYPES

function setQuestion() {

	// ONLY WHEN THERE AREN'T ANYMORE QUESTIONS, IT TAKES
	// REPEATS FROM THE JSON FILE

	if(questionsArray.length == 0) {
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
}

// BASED ON THE TURN, AND PLAYER COUNT: SETS UP THE BOARD

setup();

function setup() {

	if (localStorage.playerCount == 1) {
		$('#turn').text("PRACTICE");
	}

	if (turn === 0 || localStorage.playerCount == 1) {
		// $(".colorBlock").css("border", "8px solid black");
		setTimeout(function() {$(player).css("display", "none"); }, 3000);
		setTimeout(questions, 3000);

	} 
	else {

		setTimeout(function() { $(player).css("display", "none"); }, 3000);

			if(player === "#player1") {

				setTimeout(function() { $("#player2").css("display", "block");
				$("#turn").text("PLAYER 2"); 
				}, 3000);

				setTimeout(function() {$("#player2").css("display", "none");
				player = "#player2";
				questions();
				}, 6000);

			} else if (player === "#player2") {

				setTimeout(function() { $("#player1").css("display", "block");
				$("#turn").text("PLAYER 1");
				}, 3000);

				setTimeout(function() {$("#player1").css("display", "none");
				player = "#player1";
				questions();
				}, 6000);
			}
	}
}

// SWITCH FROM PLAYER 1/2 BLOCKS PAGE TO THE QUESTION PAGE

	// VARIABLES USED

		// PICKS A COLOR FOR THE QUESTION/ANSWER HEADER BACKGROUND AND THE BLOCKS' IMAGES
		// THAT CORRESPOND TO THE CODE TYPE

			var color;
			var images;

function questions() {

	$('#banner').css("display", "none");

	$('.question').css("display", "block");

	// AUTO FOCUSES ON TEXT BOX

	if (document.getElementById("displayQuestion").style.display == "block") {
		$("#inputAnswer").focus();
	}

	$('#question').text(questionSet);

	if (typeSet == "html") {
		color = "#E44D26";
		images = "url(\"./img/HTML_Full.png\")";

	} else if (typeSet == "css") {
		color = "#0070BA";
		images = "url(\"./img/CSS_Full.png\")";

	} else if (typeSet == "javascript") {
		color = "#63A814";
		images = "url(\"./img/JavaScript_Full.png\")";
	}

	$('#questionType').text(typeSet.toUpperCase());
	$('#questionType').css("background-color", color);
	$('#guess').css("background-color", color);
	$('#answerType').css("background-color", color);
	$('#continue').css("background-color", color);
	
}

// WHEN GUESS IS CLICKED ON THE ANSWER PAGE: GOES TO REVEAL THE CORRECT ANSWER
// AND DETERMINE IF THE USER IS CORRECT / INCORRECT

	// VARIABLES

		// WHEN THE CONTINUE BUTTON IS CLICKED LATER, THIS VALUES MAKES SURE THAT THE
		// CURRENT BLOCK ONLY GETS ANIMATED IF IT WAS JUST CORRECTLY ANSWERED AND NOT
		// FOR A TURN OR MULTIPLE TURNS AGO

		var rightAnswer = 0;

$('#guess').click(guessPress);

function guessPress() {

	$('#answerLink').text(aboutSet);
	$('#description').text(descriptionSet);
	$('#answerLink').attr("href", linkSet);
	$('#answerLink').attr("class", "helpfulLink");

	if ($('#inputAnswer').val().toLowerCase() == answerSet.toLowerCase() || $('#inputAnswer').val().toLowerCase() == "cheat") {
		$('#answerType').text("CORRECT!");
		rightAnswer = 1;
		answers();
		correct();
	} else if ($('#inputAnswer').val() === "") {
		$('#inputAnswer').attr("placeholder", "Don't forget to answer!");
	} else {
		$('#answerType').text("INCORRECT.");
		$('#description').text(descriptionSet);

		if(player === "#player1") {
			player1Incorrect.push("<p class='helpfulLink'><a target=\"_blank\" href='" + linkSet +"'>" + aboutSet + "</a></p>");
		} else if (player === "#player2") {
			player2Incorrect.push("<p class='helpfulLink'><a target=\"_blank\" href='" + linkSet +"'>" + aboutSet + "</a></p>");
		}
		answers();
		checkWin();
	}

	$('#inputAnswer').val("");

}

// SWITCHES THE DISPLAY FROM THE QUESTION SECTION TO THE ANSWER SECTION

function answers() {
	$('.question').css("display", "none");
	$('.answer').css("display", "block");
}

// CALLED UPON IF A PLAYER GUESSES AN ANSWER CORRECTLY

	// VARIABLES USED

		// HOW MANY POINTS THE PLAYERS CURRENTLY HAVE, DETERMINING WINNER/LOSER/SUDDEN DEATH

			var player1Points = 0;
			var player2Points = 0;

		// ATTACHES THE POINT VALUE OF THE CURRENT PLAYER TO THIS VARIABLE SO
		// THE CORRECT BLOCK WILL BE MOVED, AND FOR THE RIGHT PLAYER, AFTER CONTINUE IS PRESSED

			var currentPlayer;

		// USED TO STORE THE CURRENT BLOCK FOR PLAYER 1 OR 2 TO BE MANIPULATED

			var blocks;

		// HELPS FIGURE OUT WHICH BLOCK SHOULD BE MANIPULATED	

			var player1Blocks = 1;
			var printPlayer1Blocks = '#block1_' + player1Blocks;
			var player2Blocks = 1;
			var printPlayer2Blocks = '#block2_' + player2Blocks;

		// ARRAYS HOLDING ON TO CORRECT/INCORRECT CHOICES BY PLAYERS TO SHOW IN RESULTS PAGE

			var player1Correct = [];
			var player1Incorrect = [];

			var player2Correct = [];
			var player2Incorrect = [];

function correct() {

	if (player == "#player1") {
		blocks = printPlayer1Blocks;
		player1Points++;
		player1Correct.push("<p class='helpfulLink'><a target=\"_blank\" href='" + linkSet +"'>" + aboutSet + "</a></p>");
		
	} else if (player == "#player2") {
		blocks = printPlayer2Blocks;
		player2Points++;
		player2Correct.push("<p class='helpfulLink'><a target=\"_blank\" href='" + linkSet +"'>" + aboutSet + "</a></p>");
	}

	$(blocks).css("background-image", images);
	$(blocks).css("background-size", "cover");

	if (player == "#player1") {
		currentPlayer = player1Points;

	} else {
		currentPlayer = player2Points;
	}

	if (player == "#player1") {
		player1Blocks++;
		printPlayer1Blocks = "#block1_" + player1Blocks;

	} else if (player == "#player2") {
		player2Blocks++;
		printPlayer2Blocks = "#block2_" + player2Blocks;
	}
	checkWin();
	}

// CHECKS TO SEE IF THERE IS A WINNER ON THIS TURN

	// VARIABLES USED

		// SET TO 1 IF PLAYER 1 COMPLETES THE BLOCK AND PLAYER 2 HAS A CHANCE TO AS WELL ON
		// THE NEXT TURN, GIVING EACH PLAYER AN EQUAL SHOT TO WIN

			var lastTurn = 0;

		// SET TO 1 IF EACH PLAYER HAS THE SAME AMOUNT OF POINTS AT THE END OF THE GAME OR
		// DURING SUDDEN DEATH, TAKING PLACE AFTER THAT OUTCOME

			var suddenDeath = 0;

function checkWin() {

	//IF IT'S THE "LAST TURN" AND BOTH PLAYERS HAVE THE SAME AMOUNT OF POINTS
	if (lastTurn === 1 && player1Points === 9 && player2Points === 9) {
		suddenDeath = 1;
		turn = 0;
		player1Points = 0;
		player2Points = 0;

	// IF IT'S THE "LAST TURN" AND PLAYER 2 ANSWERED INCORRECTLY
	} else if (lastTurn === 1 && player1Points === 9 && player2Points === 8) {
		breakdown();

	// PLAYER 2 WINS IF PLAYER 1 DID NOT WIN ON THE SAME TURN (AS PLAYER 1 GOES FIRST)
	} else if (player2Points === 9 && player1Points !== 9) {
		breakdown();

	// PLAYER 1 WINS IF PLAYER 2 CAN'T TIE THE GAME ON THE SAME TURN
	} else if (player1Points === 9 && player2Points < 8) {
		breakdown();

	// ENABLES LAST TURN ONLY IF PLAYER 2 HAS A CHANCE TO TIE THE GAME
	} else if (player1Points === 9 && player2Points === 8) {
		lastTurn = 1;
	}
}

// WHEN CONTINUE IS PRESSED ON THE ANSWERS SCREEN...

$('#continue').click(continuePress);

function continuePress() {

// // IF THE ANSWER IS CORRECT, THE NEWLY FILLED IN BLOCK WILL ANIMATE PROPERLY

	if (rightAnswer === 1) {
		if (currentPlayer === 1 || currentPlayer === 4 || currentPlayer === 7) {
			$(blocks).animate({left: "-=800px"}, 0);
			$(blocks).animate({left: "+=400px"}, 750, "linear");
			$(blocks).animate({left: "+=400px"}, 750, "linear");
		} else if (currentPlayer === 2 || currentPlayer === 5 ||currentPlayer === 8) {
			$(blocks).animate({top: "-=800px"}, 0);
			$(blocks).animate({top: "+=400px"}, 750, "linear");
			$(blocks).animate({top: "+=400px"}, 750, "linear");
		} else if (currentPlayer === 3 || currentPlayer === 6 ||currentPlayer === 9) {
			$(blocks).animate({right: "-=800px"}, 0);
			$(blocks).animate({right: "+=400px"}, 750, "linear");
			$(blocks).animate({right: "+=400px"}, 750, "linear");
		}
		rightAnswer = 0;
	}

	// IF IT'S SUDDEN DEATH, IT WILL SAY SO AND THEN GO TO SET UP ANOTHER QUESTION
	// UNLESS A PLAYER WINS AND THEN IT SENDS THE PLAYER OVER TO THE RESULTS PAGE

	if (suddenDeath === 1) {
		$('#banner').css("display", "block");
		$('#banner').text("SUDDEN DEATH");

		if (turn%2 === 0 && (player1Points > player2Points)) {
			breakdown();
		} else if (turn%2 === 0 && (player2Points > player1Points)) {
			breakdown();
		} else {
			turn++;
			$('.answer').css("display", "none");
			$(player).css("display", "block");
			setQuestion();
			setup();
		}

	} else {
			
		turn++;
		$('.answer').css("display", "none");
		$(player).css("display", "block");
		setQuestion();
		setup();
	}
}

// FOR THE RESULTS PAGE...

function breakdown() {

// TURNS ON/OFF SECTION DISPLAYS PROPERLY

	$('.answer').css("display", "none");
	$(player).css("display", "block");
	$('#banner').css("display", "block");

// CREATES A BANNER FOR WHO WON ("BLOCK COMPLETED" FOR SOLO PLAY)

	$('h1').css("visibility", "hidden");

	if (localStorage.playerCount == 1) {
		$('#banner').text("BLOCK COMPLETED");

	} else if (player1Points > player2Points) {
		$('#banner').text("PLAYER 1 WINS");

	} else if (player2Points > player1Points) {
		$('#banner').text("PLAYER 2 WINS");
	}

// AFTER SOME TIME HAS PASSED VIEWING THE WINNING BLOCK AND PLAYER...

setTimeout(function() {

	$('h1').css("visibility", "visible");

// TURNS ON/OFF SECTION DISPLAYS PROPERLY

	$('#turn').css("display", "none");
	$('#banner').css("display", "none");
	$(player).css("display", "none");
	$('.finish').css("display", "block");

//

// if(player1Correct.length == 0) {
// 	$('player1Correct').css("display", "none");
// }

// if(player1Incorrect.length == 0) {
// 	$('player1Incorrect').css("display", "none");
// }

// if(player2Correct.length == 0) {
// 	$('player2Correct').css("display", "none");
// }

// if(player2Incorrect.length == 0) {
// 	$('player2Incorrect').css("display", "none");
// }

// APPENDS ALL THE CORRECT AND INCORRECT ANSWERS TO DISPLAY ON THE RESULTS PAGE

	for (i = 0; i <= questionsUsed.length; i++) {
		$('#player1Correct').append(player1Correct[i]);
		$('#player1Incorrect').append(player1Incorrect[i]);
		$('#player2Correct').append(player2Correct[i]);
		$('#player2Incorrect').append(player2Incorrect[i]);
	}

// CHANGES THE DISPLAY IF SOLO PLAY IS ENABLED (LIKE REMOVING PLAYER 2 CONTENT)

	if(localStorage.playerCount == 1) {
		$('#player1Finish').text("OVERVIEW");
		$('#player2Finish').css("display", "none");
		$('#player2Correct').css("display", "none");
		$('#player2Incorrect').css("display", "none");
		$('#player2Finish').css("display", "none");
	}
	}, 5000)

}

// WHEN REPLAY IS CLICKED, IT RESETS ALL OF THE CONTENT TO SET UP A NEW GAME AND CHANGES DISPLAYS

$('#replay').click(replayPress);

function replayPress() {

	$('.finish').css("display", "none");

	player1Correct = [];
	player1Incorrect = [];
	player2Correct = [];
	player2Incorrect = [];
	player1Points = 0;
	player2Points = 0;
	currentPlayer = 0;
	lastTurn = 0;
	suddenDeath = 0;
	player1Blocks = 1;
	player2Blocks = 1;
	printPlayer1Blocks = '#block1_' + player1Blocks;
	printPlayer2Blocks = '#block2_' + player2Blocks;
	turn = 0;
	player = "#player1";

	$(".colorBlock").css("background-image", "none");
	$('#player1').css("display", "block");
	$('#turn').css("display", "block");
	$("#turn").text("PLAYER 1"); 

	setup();

	}

})