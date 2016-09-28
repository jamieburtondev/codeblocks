$(document).ready(function(){

var htmlQuestions = 

[
{ question : "How much wood could a woodchuck chuck if a woodchuck could chuck wood, approximately?", 
  answer : "a", type : "html", 
  description : "Here is the first description to the answer.", 
  link : "www.w3schools.com", about : "Background"},
{ question : "How much wood could a woodchuck chuck if a woodchuck could chuck wood, approximately?", 
  answer : "a", type : "html",
  description : "Here is the second description to the answer.", 
  link : "www.w3schools.com", about : "Background"}
];

var cssQuestions = 

[
{ question : "How much wood could a woodchuck chuck if a woodchuck could chuck wood, approximately?", 
  answer : "a", type : "css", 
  description : "Here is the first description to the answer.", 
  link : "www.w3schools.com", about : "Background"},
{ question : "How much wood could a woodchuck chuck if a woodchuck could chuck wood, approximately?", 
  answer : "a", type : "css", 
  description : "Here is the second description to the answer.", 
  link : "www.w3schools.com", about : "Background"}
];

var javascriptQuestions = 

[
{ question : "How much wood could a woodchuck chuck if a woodchuck could chuck wood, approximately?", 
  answer : "a", type : "javascript", 
  description : "Here is the first description to the answer.", 
  link : "www.w3schools.com", about : "Background"},
{ question : "How much wood could a woodchuck chuck if a woodchuck could chuck wood, approximately?", 
  answer : "a", type : "javascript", 
  description : "Here is the second description to the answer.", link : "www.w3schools.com", about : "Background"}
];

var questionsUsed = [];



// localStorage.playerCount

var player1Correct = [];
var player1Incorrect = [];

var player2Correct = [];
var player2Incorrect = [];


// Randomized question + answer + type (HTML, CSS, or JavaScript) 
var questionSet;
var answerSet;
var typeSet;

// What category of questions will a question be taken from
var category;

// Allows the color and image of a certain category to be inserted
var color;
var images;

var turn = 0;
var player = "#player1";

var player1Blocks = 1;
var printPlayer1Blocks = '#block1_' + player1Blocks;

var player2Blocks = 1;
var printPlayer2Blocks = '#block2_' + player2Blocks;

// PAGE BEGINNING!

// Sets the category of question, the exact question, answer, and type

var questionsArray = [];

setQuestion();

function setQuestion() {

	if (questionsArray.length === 0) {

		if (localStorage.html == 1) {
			questionsArray = questionsArray.concat(htmlQuestions);
		}

		if (localStorage.css == 1) {
			questionsArray = questionsArray.concat(cssQuestions);
		}

		if (localStorage.javascript == 1) {
			questionsArray = questionsArray.concat(javascriptQuestions);
		}

	}

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

// Determines the turn, whether Player 1 or Player 2, sets up board

setup();

function setup() {

if (localStorage.playerCount == 1) {
	$('#turn').text("PRACTICE");
}

if (turn === 0 || localStorage.playerCount == 1) {
	$(".colorBlock").css("border", "8px solid black");
	setTimeout( function() {$(player).css("display", "none"); }, 3000);
	setTimeout(questions, 3000);

} else {

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

// SWITCH FROM BLOCKS TO A QUESTION

	function questions() {

	$('.question').css("display", "block");

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

// SWITCH FROM ANSWERING A QUESTION TO REVEALING THE ANSWER

$('#guess').click(function() {

	if ($('#inputAnswer').val() == answerSet) {
			$('#answerType').text("CORRECT!");
			$('#description').text(descriptionSet);
			answers();
			correct();
		} else if ($('#inputAnswer').val() === "") {
			$('#inputAnswer').attr("placeholder", "Don't forget to answer the question!");
		} else {
			$('#answerType').text("INCORRECT.");
			$('#description').text(descriptionSet);

			if(player === "#player1") {
				player1Incorrect.push("<p class='helpfulLink'><a href='" + linkSet +"'>" + aboutSet + "</a></p>");
			} else if (player === "#player2") {
				player2Incorrect.push("<p class='helpfulLink'><a href='" + linkSet +"'>" + aboutSet + "</a></p>");
			}


			answers();
		}

		$('#inputAnswer').val("");

})

var player1Points = 0;
var player2Points = 0;
var animateTurn = 1;
var currentPlayer;
var blocks;

function correct() {

	if (player == "#player1") {
		blocks = printPlayer1Blocks;
		player1Points++;
		player1Correct.push("<p class='helpfulLink'><a href='" + linkSet +"'>" + aboutSet + "</a></p>");
	} else if (player == "#player2") {
		blocks = printPlayer2Blocks;
		player2Points++;
		player2Correct.push("<p class='helpfulLink'><a href='" + linkSet +"'>" + aboutSet + "</a></p>");
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

var lastTurn = 0;
var suddenDeath = 0;

function checkWin() {

//If it's the last turn and both players have the same points
if (lastTurn === 1 && player1Points === 9 && player2Points === 9) {
	suddenDeath = 1;
	turn = 0;
	player1Points = 0;
	player2Points = 0;
//If it's the last turn and Player 2 did not answer correctly
} else if (lastTurn === 1 && player1Points === 9 && player2Points === 8) {
	breakdown();
} else {
// Player 2 wins if Player 1 did not win on same turn
if (player2Points === 9 && player1Points !== 9) {
	breakdown();
// Player 1 wins if Player 2 can't win on same turn
} else if (player1Points === 9 && player2Points < 8) {
	breakdown();
// Enables last turn so Player 2 has a chance to tie
} else if (player1Points === 9 && player2Points === 8) {
	lastTurn = 1;
	}
}
}

function answers() {
	$('.question').css("display", "none");
	$('.answer').css("display", "block");
}

// SWITCH FROM REVEALING ANSWER BACK TO BLOCKS

$('#continue').click(function() {

console.log(currentPlayer);

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

})

function breakdown() {

	$('.answer').css("display", "none");

	$(player).css("display", "block");

	$('#banner').css("display", "block");

if (localStorage.playerCount == 1) {
	$('#banner').text("BLOCK COMPLETED");
} else if (player1Points > player2Points) {
	$('#banner').text("PLAYER 1 WINS");
} else if (player2Points > player1Points) {
	$('#banner').text("PLAYER 2 WINS");
}


setTimeout(function() {

	$('#turn').css("display", "none");

	$('#banner').css("display", "none");

	$(player).css("display", "none");

	$('.finish').css("display", "block");

	for (i = 0; i <= turn; i++) {
		$('#player1Correct').append(player1Correct[i]);
		$('#player1Incorrect').append(player1Incorrect[i]);
		$('#player2Correct').append(player2Correct[i]);
		$('#player2Incorrect').append(player2Incorrect[i]);
	}

	if(localStorage.playerCount == 1) {
		$('#player1Finish').text("OVERVIEW");
		$('#player2Finish').css("display", "none");
		$('#player2Correct').css("display", "none");
		$('#player2Incorrect').css("display", "none");
		$('#player2Finish').css("display", "none");
	}

}, 8000)


}

$('#replay').click(function(){

	$('.finish').css("display", "none");

	player1Correct = [];
	player1Incorrect = [];
	player2Correct = [];
	player2Incorrect = [];
	player1Points = 0;
	player2Points = 0;
	lastTurn = 0;
	suddenDeath = 0;
	player1Blocks = 0;
	player2Blocks = 0;
	turn = 0;
	player = "#player1";

	$(".colorBlock").css("background-image", "none");
	$('#player1').css("display", "block");
	$('#turn').css("display", "block");
	$("#turn").text("PLAYER 1"); 

	setup();

})

}) // document ready