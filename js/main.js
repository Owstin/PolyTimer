var timer = document.getElementById('timer');
var ready = document.getElementById('ready');
var scramble = document.getElementById('scramble');

var watch = new Timer(timer);
var generatedScramble = scramblers["333"].getRandomScramble().scramble_string;

//Stops the space bar from scrolling the page down
window.onkeydown = function(e) { 
    return !(e.keyCode == 32);
};

document.body.onkeyup = function(e) {
    if (e.keyCode == 32) {
        if (watch.isOn) {
            watch.stop();
            solves.push(formattedTime);
            drawSolveTable();
            timer.style.color = 'white';

            console.log(solves);
        } else {
            watch.start();
            timer.style.color = 'white';
            scramble.textContent = generatedScramble;
        }
    }
}

document.body.onkeydown = function(e) {
    if (e.keyCode == 32) {
        if (!watch.isOn) {
            watch.reset();
            timer.style.color = 'red';
        } else {
            generatedScramble = scramblers["333"].getRandomScramble().scramble_string;
        }
    }
}