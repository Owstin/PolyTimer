var timer = document.getElementById('timer');
var ready = document.getElementById('ready');
var scramble = document.getElementById('scramble');

var watch = new Timer(timer);
var generatedScramble = scramblers["333"].getRandomScramble().scramble_string;

var scrambles = [];
var scrambleIndex = 0;

scramble.textContent = generatedScramble;

var table = document.getElementById("solvesTable");

//Stop the space bar from scrolling the page down
window.onkeydown = function(e) { 
    return !(e.keyCode == 32);
};

document.body.onkeyup = function(e) {
    if (e.keyCode == 32) {
        if (watch.isOn) {
            watch.stop();
            timer.style.color = 'white';

            var floatTime = parseFloat(formattedTime);
            solves.push(floatTime);

            var row = table.insertRow(-1);
            var col1 = row.insertCell(0);
            var col2 = row.insertCell(1);
            var col3 = row.insertCell(2);
            var col4 = row.insertCell(3);

            var total = 0;

            for (var i = 0; i < solves.length; i++) {
                total += solves[i];
            }

            var sAvg = total / solves.length; //session average

            if (solves.length > 5) {
                var last5 = solves.slice(Math.max(solves.length - 5, 1));
                var sumOf5 = 0;

                for (var i = 0; i < 5; i++) {
                    sumOf5 += last5[i];
                }

                ao5 = sumOf5 / 5; //current average of 5

            } else ao5 = sAvg;

            if (solves.length > 12) {
                var last12 = solves.slice(Math.max(solves.length - 12, 1));
                var sumOf12 = 0;

                for (var i = 0; i < 12; i++) {
                    sumOf12 += last12[i];
                }

                ao12 = sumOf12 / 12; //current average of 12

            } else ao12 = sAvg;

            col1.innerHTML = solves.length;
            col2.innerHTML = floatTime.toFixed(2);
            col3.innerHTML = ao5.toFixed(2);
            col4.innerHTML = ao12.toFixed(2);

            ao5s.push(ao5.toFixed(2));
            ao12s.push(ao12.toFixed(2));

            localStorage.setItem("solves", JSON.stringify(solves));
            localStorage.setItem("ao5s", JSON.stringify(ao5s));
            localStorage.setItem("ao12s", JSON.stringify(ao12s));
        } else {
            watch.start();
            timer.style.color = 'white';
            
            generatedScramble = scramblers["333"].getRandomScramble().scramble_string;
            scrambles.push(generatedScramble);
            scramble.textContent = generatedScramble;
            scrambleIndex += 1;
        }
    }
}

document.body.onkeydown = function(e) {
    if (e.keyCode == 32) {
        if (!watch.isOn) {
            watch.reset();
            timer.style.color = 'red';
        } else {
            //generatedScramble = scramblers["333"].getRandomScramble().scramble_string;
        }
    }

    if (e.keyCode == 8 && solves.length > 0) {
        var delConfirm = confirm("delete last solve?");

        if (delConfirm == true) {
            solves.pop();
            ao5s.pop();
            ao12s.pop();

            var row = table.deleteRow(-1);

            localStorage.setItem("solves", JSON.stringify(solves));
            localStorage.setItem("ao5s", JSON.stringify(ao5s));
            localStorage.setItem("ao12s", JSON.stringify(ao12s));
        }
    }
}