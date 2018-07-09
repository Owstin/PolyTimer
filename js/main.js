var timer = document.getElementById('timer');
var ready = document.getElementById('ready');
var scramble = document.getElementById('scramble');

var watch = new Timer(timer);
var generatedScramble = scramblers["333"].getRandomScramble().scramble_string;

ready.style.visibility = "hidden";

//Stops the space bar from scrolling the page down
window.onkeydown = function(e) { 
    return !(e.keyCode == 32);
};

document.body.onkeyup = function(e) {
    if (e.keyCode == 32) {
        if (watch.isOn) {
            watch.stop();
        } else {
            watch.start();
            ready.style.visibility = "hidden";
            scramble.textContent = generatedScramble;
        }
    }
}

document.body.onkeydown = function(e) {
    if (e.keyCode == 32) {
        if (!watch.isOn) {
            ready.style.visibility = "visible";
            watch.reset();
        } else {
            generatedScramble = scramblers["333"].getRandomScramble().scramble_string;
        }
    }
}