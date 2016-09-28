$(document).ready(function(){

localStorage.html = 0;
localStorage.css = 0;
localStorage.javascript = 0;
localStorage.playerCount = 0;

// INDEX.HTML / Clicking HTML, CSS, JavaScript

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

//INDEX.HTML / Selecting Solo or Versus

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

// Checks to see if any types and solo or versus were chosen. If not, the game won't start.

function check() {
	if ((html.style.opacity == .5 && css.style.opacity == .5 && js.style.opacity == .5) || (solo.style.opacity == .5 && versus.style.opacity ==.5)) {
		$('#link').removeAttr("href");
	} else {
		$('#link').attr("href", "main.html");
	}
}

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