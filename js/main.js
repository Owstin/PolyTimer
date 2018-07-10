var timer = document.getElementById('timer');
var ready = document.getElementById('ready');
var scramble = document.getElementById('scramble');

var watch = new Timer(timer);
var generatedScramble = scramblers["333"].getRandomScramble().scramble_string;

var table = document.getElementById("solvesTable");

//Stops the space bar from scrolling the page down
window.onkeydown = function(e) { 
    return !(e.keyCode == 32);
};

document.body.onkeyup = function(e) {
    if (e.keyCode == 32) {
        if (watch.isOn) {
            watch.stop();
            solves.push(formattedTime);
            timer.style.color = 'white';

            var row = table.insertRow(-1);
            var col1 = row.insertCell(0);
            var col2 = row.insertCell(1);
            var col3 = row.insertCell(2);
            var col4 = row.insertCell(3);

            col1.innerHTML = solves.length-1;
            col2.innerHTML = formattedTime;
            col3.innerHTML = 'ao5';
            col4.innerHTML = 'ao12';

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