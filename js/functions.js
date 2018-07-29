function timeFormatter(s) {
    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;

    ms = Math.round(ms/10);

    if (hrs > 0) {

    } else {
        if (mins > 0) {
            if (secs < 10) {
                if (ms < 10) {
                    return mins + ':0' + secs + '.0' + ms;
                } else {
                    return mins + ':0' + secs + '.' + ms;
                }
            } else {
                if (ms < 10) {
                    return mins + ':' + secs + '.0' + ms;
                } else {
                    return mins + ':' + secs + '.' + ms;
                }
            }
        } else {
            if (ms < 10) {
                return secs + '.0' + ms;
            } else {
                return secs + '.' + ms;
            }
        }
    }
}

function updateStatistics() {
    //Best Single + Worst Single
    if (solves.length > 0) {var bestSingle = Math.min.apply(Math, solves);}
    else {var bestSingle = "0.00";}

    var worstSingle = Math.max.apply(Math, solves);

    //Best Average of 5 + Best Average of 12
    var ao5Slice = ao5s.slice(5, ao5s.length);
    var ao12Slice = ao12s.slice(12, ao12s.length);

    if (solves.length > 5) {var bestAo5 = Math.min.apply(Math, ao5Slice);}
    else {var bestAo5 = "0.00";}

    if (solves.length > 12) {var bestAo12 = Math.min.apply(Math, ao12Slice);}
    else {var bestAo12 = "0.00";}

    //Session Average + Session Mean
    var sumOfSesh = 0;
    var sumRemove = bestSingle + worstSingle;

    if (solves.length > 0) {
        for (var i = 0; i < solves.length; i++) {
            sumOfSesh += solves[i];
        }

        var seshMean = sumOfSesh / solves.length;

        if (solves.length > 2) {
            var seshAverage = (sumOfSesh - sumRemove) / (solves.length-2);
        } else {
            var seshAverage = seshMean;
        }
    } else {seshAverage = "0.00"; seshMean = "0.00";}

    //Average of 100
    if (solves.length > 99) {
        var sliceOf100 = solves.slice(Math.max(solves.length - 100));
        var sumOf100 = 0;
        var bestOf100 = Math.min.apply(Math, sliceOf100);
        var worstOf100 = Math.max.apply(Math, sliceOf100);
        var sumRemove = bestOf100 + worstOf100;

        for (var i = 0; i < 100; i++) {
            sumOf100 += solves[i];
        }

        var averageOf100 = (sumOf100 - sumRemove) / 98;

    } else {var averageOf100 = "0.00";}

    //Average of 1000
    if (solves.length > 999) {
        var sliceOf100 = solves.slice(Math.max(solves.length - 1000));
        var sumOf1000 = 0;
        var bestOf1000 = Math.min.apply(Math, sliceOf1000);
        var worstOf1000 = Math.max.apply(Math, sliceOf1000);
        var sumRemove = bestOf1000 + worstOf1000;

        for (var i = 0; i < 1000; i++) {
            sumOf1000 += solves[i];
        }

        var averageOf1000 = (sumOf1000 - sumRemove) / 998;

    } else {var averageOf1000 = "0.00";}

    //Set all the statistics

    document.getElementById('statsSessionAverage').textContent = timeFormatter(seshAverage);
    document.getElementById('statsSessionMean').textContent = timeFormatter(seshMean);

    document.getElementById('statsBestSingle').textContent = timeFormatter(bestSingle);
    document.getElementById('statsBestAo5').textContent = timeFormatter(bestAo5);
    document.getElementById('statsBestAo12').textContent = timeFormatter(bestAo12);

    if (ao5s.length > 0) {document.getElementById('statsAverageOf5').textContent = timeFormatter(ao5s[ao5s.length-1]);}
    else {document.getElementById('statsAverageOf5').textContent = "0.00";}

    if (ao12s.length > 0) {document.getElementById('statsAverageOf12').textContent = timeFormatter(ao12s[ao12s.length-1]);}
    else {document.getElementById('statsAverageOf12').textContent = "0.00";}

    document.getElementById('statsAverageOf100').textContent = timeFormatter(averageOf100);
}

function updateSettings() {
    //show time during solves
    if (localStorage.getItem("showTime") == null) {showTime = true;} else {showTime = JSON.parse(localStorage.getItem("showTime"));}
    document.getElementById("checkBoxHideShowTime").checked == showTime;

    //draw scramble
    var scrambleDiv = document.getElementById("scrambleDiv");
    if (localStorage.getItem("drawScramble") == null) {drawScramble = false; scrambleDiv.style.display = "none";} else {drawScramble = JSON.parse(localStorage.getItem("drawScramble")); 
    if (drawScramble == false) {scrambleDiv.style.display = "none"} else {scrambleDiv.style.display = "block";}}
    document.getElementById("checkBoxHideShowScramble").checked == drawScramble;
}

function hideShowTime() {
    if (showTime == true) {
        showTime = false;
    } else {
        showTime = true;
    }

    localStorage.setItem("showTime", JSON.stringify(showTime));
}

function hideShowScramble() {
    var scrambleDiv = document.getElementById("scrambleDiv");

    if (drawScramble == false) {
        drawScramble = true;
        scrambleDiv.style.display = "block";
    } else {
        drawScramble = false;
        scrambleDiv.style.display = "none";
    }

    localStorage.setItem("drawScramble", JSON.stringify(drawScramble));
}

function clearSolves() {
    if (confirm("Really delete all of your saved data?") == true) {
        localStorage.clear();
        window.location.reload(true);
    }
}

function updateThemeBox() {
    var selectBox = document.getElementById("selectBoxTheme");
    selectBox.value = getActiveStyleSheet();
}

function updateScrambleBox() {
    var selectBox = document.getElementById("selectBoxScramble");

    if (localStorage.getItem("scrambleType") === null) {
        selectBox.value = "333";
    } else {
        selectBox.value = JSON.parse(localStorage.getItem("scrambleType"));
    }
}

function changeTheme() {
    var selectBox = document.getElementById("selectBoxTheme");
    var theme = selectBox.value;

    setActiveStyleSheet(theme);
    window.location.reload(true);
}

function changeScramble() {
    var selectBox = document.getElementById("selectBoxScramble");
    var selectedVal = selectBox.options[selectBox.selectedIndex].value;

    scrambleType = selectedVal;
    localStorage.setItem("scrambleType", JSON.stringify(scrambleType));
    window.location.reload(true);
}

function removeElement(elementId) {
    var element = document.getElementById(elementId);
    element.parentNode.removeChild(element);
}

function updateScramble(scramble) {
    // Create an element and draw the scramble in it.
    var innerDiv = document.createElement("div");
    innerDiv.setAttribute("id", "scrambleDiv");
    scramblers[scrambleType].drawScramble(innerDiv, scramble.state, 200, 120);
    document.body.appendChild(innerDiv);
}

function addSolve () {
    var userInput = prompt("Enter your solve time. (Example: 4.22 or 1:14.86)");
    var msTime = toMS(userInput);

    //push time to solves array, then update solves array in sessions array, then store the sessions array
    solves.push(msTime);
    sessions.splice(currentSession, 1, solves);
    localStorage.setItem("sessions", JSON.stringify(sessions));

    var row = table.insertRow(1);
    var col1 = row.insertCell(0);
    var col2 = row.insertCell(1);
    var col3 = row.insertCell(2);
    var col4 = row.insertCell(3);

    row.id = "solvesTr";
    col1.id = "solvesTd";
    col2.id = "solvesTd";
    col3.id = "solvesTd";
    col4.id = "solvesTd";

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

        ao5 = Math.round((sumOf5-ao5Remv) / 3); //current average of 5 (sum of last 5 solves minus best and worst divided by 3)

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

        ao12 = Math.round((sumOf12-ao12Remv) / 10); //current average of 12 (sum of last 12 solves minus best and worst divided by 10)
    } else ao12 = 0.00;

    col1.innerHTML = solves.length;
    //col2.innerHTML = parseFloat(timeFormatter(msTime)).toFixed(2);
    //col3.innerHTML = parseFloat(timeFormatter(ao5)).toFixed(2);
    //col4.innerHTML = parseFloat(timeFormatter(ao12)).toFixed(2);

    var timeFormatted = timeFormatter(msTime);
    var timeFloated = parseFloat(timeFormatted).toFixed(2);

    var ao5Formatted = timeFormatter(ao5);
    var ao5Floated = parseFloat(ao5Formatted).toFixed(2);

    var ao12Formatted = timeFormatter(ao12);
    var ao12Floated = parseFloat(ao12Formatted).toFixed(2);

    //solves
    if (timeFormatted.includes(":")) {
        col2.innerHTML = timeFormatted;
    } else {
        col2.innerHTML = timeFloated;
    }

    //ao5
    if (ao5Formatted.includes(":")) {
        col3.innerHTML = ao5Formatted;
    } else {
        col3.innerHTML = ao5Floated;
    }

    //ao12
    if (ao12Formatted.includes(":")) {
        col4.innerHTML = ao12Formatted;
    } else {
        col4.innerHTML = ao12Floated;
    }

    ao5s.push(ao5);
    ao12s.push(ao12);

    localStorage.setItem("solves", JSON.stringify(solves));
    localStorage.setItem("ao5s", JSON.stringify(ao5s));
    localStorage.setItem("ao12s", JSON.stringify(ao12s));

    localStorage.setItem("scrambleType", JSON.stringify(scrambleType));

    updateStatistics();
}