$(document).ready(function(){

// INDEX.HTML JAVASCRIPT

// STORES WHAT CODE TYPES ARE SELECTED TO SEND TO MAIN.HTML

localStorage.html = 0;
localStorage.css = 0;
localStorage.javascript = 0;

// STORES AMOUNT OF PLAYERS TO SEND TO MAIN.HTML

localStorage.playerCount = 0;

// WHAT HAPPENS WHEN A BUTTON IS CLICKED ON, DISPLAY WISE

$('.clicked').css("opacity", .5);

$('.clicked').click(function(obj){

	if (obj.target.style.opacity == .5) {
		obj.target.style.opacity = 1;
		check();
	} else {
		obj.target.style.opacity = .5;
		check();
	}

}); 

// SELECTING 1 PLAYER (SOLO) OR 2 PLAYER (VERSUS)

var solo = document.getElementById('solo');
var versus = document.getElementById('versus');

solo.style.opacity = .5;
versus.style.opacity = .5;

solo.addEventListener('click', function() {

	if(solo.style.opacity == .5 && versus.style.opacity == .5) {
		solo.style.opacity = 1;
		check();
	} else if (solo.style.opacity == .5 && versus.style.opacity == 1) {
		solo.style.opacity = 1;
		versus.style.opacity = .5;
		check();
	}

});

versus.addEventListener('click', function() {

	if(versus.style.opacity == .5 && solo.style.opacity == .5) {
		versus.style.opacity = 1;
		check();
	} else if (versus.style.opacity == .5 && solo.style.opacity == 1) {
		versus.style.opacity = 1;
		solo.style.opacity = .5;
		check();
	}

});

// CHECKS IF SOLO/VERSUS CHOSEN AND IF AT LEAST ONE CODE TYPE WAS CHOSEN

function check() {
	if ((html.style.opacity == .5 && css.style.opacity == .5 && js.style.opacity == .5) || (solo.style.opacity == .5 && versus.style.opacity ==.5)) {
		$('#link').removeAttr("href");
	} else {
		$('#link').attr("href", "main.html");
	}
}

// START BUTTON, ASSIGNING VALUES TO LOCAL STORAGE FOR MAIN.HTML'S USE

var html = document.getElementById('html');
var css = document.getElementById('css');
var js = document.getElementById('js');

$('#start').click(function() {

	if (html.style.opacity == 1) {
		localStorage.html = 1;
	}

	if (css.style.opacity == 1) {
		localStorage.css = 1;
	}

	if (js.style.opacity == 1) {
		localStorage.javascript = 1;
	}

	if (solo.style.opacity == 1) {
		localStorage.playerCount = 1;
	} else if (versus.style.opacity == 1) {
		localStorage.playerCount = 2;
	} 
	
})

})