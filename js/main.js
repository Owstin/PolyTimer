var timer = document.getElementById('timer');
var ready = document.getElementById('ready');
var scramble = document.getElementById('scramble');

var watch = new Timer(timer);

if (localStorage.getItem("scrambleType") === null) {
    var scrambleType = "333";
} else {
    var scrambleType = JSON.parse(localStorage.getItem("scrambleType"));
}

if (scrambleType == "222") {var generatedScramble = scramblers["222"].getRandomScramble().scramble_string;}
if (scrambleType == "333") {var generatedScramble = scramblers["333"].getRandomScramble().scramble_string;}
if (scrambleType == "444") {var generatedScramble = scramblers["444"].getRandomScramble().scramble_string;}
if (scrambleType == "555") {var generatedScramble = scramblers["555"].getRandomScramble().scramble_string;}
if (scrambleType == "666") {var generatedScramble = scramblers["666"].getRandomScramble().scramble_string;}
if (scrambleType == "777") {var generatedScramble = scramblers["777"].getRandomScramble().scramble_string;}

if (scrambleType == "333bf") {var generatedScramble = scramblers["333bf"].getRandomScramble().scramble_string;}

scramble.textContent = generatedScramble;

var scrambles = [generatedScramble];
var scrambleIndex = 0;

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
            
            if (watch.minutes < 0) {
                var floatTime = parseFloat(formattedTime);
            } else {
                var floatTime = formattedTime;
            }

            solves.push(floatTime);

            var row = table.insertRow(2);
            var col1 = row.insertCell(0);
            var col2 = row.insertCell(1);
            var col3 = row.insertCell(2);
            var col4 = row.insertCell(3);

            var total = 0;
            var worstSavg = Math.max.apply(Math,solves);
            var bestSavg = Math.min.apply(Math,solves);
            var sAvgRemv = worstSavg + bestSavg;

            for (var i = 0; i < solves.length; i++) {
                total += solves[i];
            }

            var sAvg = (total-sAvgRemv) / (solves.length-2); //session average

            if (solves.length > 4) {
                var last5 = solves.slice(Math.max(solves.length - 5));
                var sumOf5 = 0;
                var worstOf5 = Math.max.apply(Math,last5);
                var bestOf5 = Math.min.apply(Math,last5);
                var ao5Remv = worstOf5 + bestOf5;

                for (var i = 0; i < 5; i++) {
                    sumOf5 += last5[i];
                }

                ao5 = (sumOf5-ao5Remv) / 3; //current average of 5 (sum of last 5 solves minus best and worst divided by 3)

            } else ao5 = 0.00;

            if (solves.length > 11) {
                var last12 = solves.slice(Math.max(solves.length - 12));
                var sumOf12 = 0;
                var worstOf12 = Math.max.apply(Math,last12);
                var bestOf12 = Math.min.apply(Math,last12);
                var ao12Remv = worstOf12 + bestOf12;

                for (var i = 0; i < 12; i++) {
                    sumOf12 += last12[i];
                }

                ao12 = (sumOf12-ao12Remv) / 10; //current average of 12 (sum of last 12 solves minus best and worst divided by 10)
            } else ao12 = 0.00;

            col1.innerHTML = solves.length;
            col2.innerHTML = floatTime.toFixed(2);
            col3.innerHTML = ao5.toFixed(2);
            col4.innerHTML = ao12.toFixed(2);

            ao5s.push(ao5.toFixed(2));
            ao12s.push(ao12.toFixed(2));

            localStorage.setItem("solves", JSON.stringify(solves));
            localStorage.setItem("ao5s", JSON.stringify(ao5s));
            localStorage.setItem("ao12s", JSON.stringify(ao12s));

            localStorage.setItem("scrambleType", JSON.stringify(scrambleType));
        } else {
            if (settingsOpen == false) {
                watch.start();
                timer.style.color = 'white';
                
                if (scrambleType == "222") {var generatedScramble = scramblers["222"].getRandomScramble().scramble_string;}
                if (scrambleType == "333") {var generatedScramble = scramblers["333"].getRandomScramble().scramble_string;}
                if (scrambleType == "444") {var generatedScramble = scramblers["444"].getRandomScramble().scramble_string;}
                if (scrambleType == "555") {var generatedScramble = scramblers["555"].getRandomScramble().scramble_string;}
                if (scrambleType == "666") {var generatedScramble = scramblers["666"].getRandomScramble().scramble_string;}
                if (scrambleType == "777") {var generatedScramble = scramblers["777"].getRandomScramble().scramble_string;}
                
                if (scrambleType == "333bf") {var generatedScramble = scramblers["333bf"].getRandomScramble().scramble_string;}
                
                scrambles.push(generatedScramble);
                scramble.textContent = generatedScramble;
                scrambleIndex += 1;
            }
        }
    }
}

document.body.onkeydown = function(e) {
    //previous scramble (left arrow)
    if (e.keyCode == 37 && scrambleIndex > 0) {
        if (!watch.isOn) {
            scrambleIndex -= 1;
            scramble.textContent = scrambles[scrambleIndex];
            console.log(scrambleIndex);
        }
    }

    //next scramble (right arrow)
    if (e.keyCode == 39 && scrambleIndex < scrambles.length-1) {
        if (!watch.isOn) {
            scrambleIndex += 1;
            scramble.textContent = scrambles[scrambleIndex];
            console.log(scrambleIndex);
        }
    }

    if (e.keyCode == 32) {
        if (!watch.isOn) {
            watch.reset();
            timer.style.color = 'red';
        } else {
            //generatedScramble = scramblers["333"].getRandomScramble().scramble_string;
        }
    }

    if (e.keyCode == 8 && solves.length > 0) {
<<<<<<< HEAD
        if (!watch.isOn) {
            var delConfirm = confirm("Delete last solve?");
=======
        var delConfirm = confirm("Delete last solve?");
>>>>>>> 3a5e8f8e71c2416e92f5c43a29f52dfb92c45177

            if (delConfirm == true) {
                solves.pop();
                ao5s.pop();
                ao12s.pop();

                var row = table.deleteRow(2);
                timer.textContent = "0.00";

                localStorage.setItem("solves", JSON.stringify(solves));
                localStorage.setItem("ao5s", JSON.stringify(ao5s));
                localStorage.setItem("ao12s", JSON.stringify(ao12s));
            }
        }
    }
}