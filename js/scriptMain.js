$(document).ready(function(){

var questionsAll = [{ question : "Question One", answer : "Answer One", type : "css"},
{ question : "Question Two", answer : "Answer Two", type : "html"}
];

// PAGE BEGINNING!

setup();

function setup() {

	setTimeout(questions, 1000);

}

// SWITCH FROM BLOCKS TO A QUESTION

	function questions() {
		$('.blocks').css("display", "none");
		$('.question').css("display", "block");
		$('#question').text(questionsAll[1].question);

		if(questionsAll[1].type === "html") {
			$('#questionType').text("HTML Question");
			$('#questionType').css("background-color", "#E55126");
			$('#guess').css("background-color", "#E55126");
			$('#answerType').css("background-color", "#E55126");
			$('#continue').css("background-color", "#E55126");
		} else if (questionsAll[1].type === "css") {
			$('#questionType').text("CSS Question");
			$('#questionType').css("background-color", "#0070BA");
			$('#guess').css("background-color", "#0070BA");
			$('#answerType').css("background-color", "#0070BA");
			$('#continue').css("background-color", "##0070BA");
		} else {
			$('#questionType').text("JavaScript Question");
			$('#questionType').css("background-color", "#63A814");
			$('#guess').css("background-color", "#63A814");
			$('#answerType').css("background-color", "#63A814");
			$('#continue').css("background-color", "#63A814");
		}
	}

// SWITCH FROM ANSWERING A QUESTION TO REVEALING THE ANSWER

$('#guess').click(function() {
	$('.question').css("display", "none");
	$('.answer').css("display", "block");
})

// SWITCH FROM REVEALED ANSWER BACK TO BLOCKS

$('#continue').click(function() {
	$('.answer').css("display", "none");
	$('.blocks').css("display", "block");
	setup();
})

}) // document ready