$(document).ready(function(){

var useHTML = 0;
var useCSS = 0;
var useJS = 0;
var players = 0;

console.log(useHTML);

// INDEX.HTML / Clicking HTML, CSS, JavaScript

$('.clicked').css("opacity", .5);

$('.clicked').click(function(obj){

if (obj.target.style.opacity == .5) {
	obj.target.style.opacity = 1;
} else {
	obj.target.style.opacity = .5;
}

}); // .clicked

//INDEX.HTML / Selecting Solo or Versus

var solo = document.getElementById('solo');
var versus = document.getElementById('versus');

solo.style.opacity = .5;
versus.style.opacity = .5;

solo.addEventListener('click', function() {

	if(solo.style.opacity == .5 && versus.style.opacity == .5) {
		solo.style.opacity = 1;
	} else if (solo.style.opacity == .5 && versus.style.opacity == 1) {
		solo.style.opacity = 1;
		versus.style.opacity = .5;
	}

}); // .clickedPlayer

versus.addEventListener('click', function() {

	if(versus.style.opacity == .5 && solo.style.opacity == .5) {
		versus.style.opacity = 1;
	} else if (versus.style.opacity == .5 && solo.style.opacity == 1) {
		versus.style.opacity = 1;
		solo.style.opacity = .5;
	}

}); // .clickedPlayer

var html = document.getElementById('html');
var css = document.getElementById('css');
var js = document.getElementById('js');

$('#start').click(function() {

	if (html.style.opacity == 1) {
		useHTML = 1;
	}

	if (css.style.opacity == 1) {
		useCSS = 1;
	}

	if (js.style.opacity == 1) {
		useJS = 1;
	}

	if (solo.style.opacity == 1) {
		players = 1;
	} else if (versus.style.opacity == 1) {
		players = 2;
	} else {
		alert("Select Players!");
	}
})

}) // document ready