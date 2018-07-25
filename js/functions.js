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

function updateSession() {
    var selectBox = document.getElementById("sessionSelect");
    
    if (currentSession > 1 && !selectBox.options[currentSession]) {
        selectBox.add(new Option('Session ' + currentSession, currentSession));
    }

    if (localStorage.getItem("currentSession") === null) {
        selectBox.value = "1";
    } else {
        selectBox.value = JSON.parse(localStorage.getItem("currentSession"));
    }
}

function changeSession() {
    var selectBox = document.getElementById("sessionSelect");

    if (selectBox.value == "new") {
        sessions.push();
        currentSession = sessions.length;
    } else {
        currentSession = Number(selectBox.value);
    }
    
    localStorage.setItem("sessions", JSON.stringify(sessions));
    localStorage.setItem("currentSession", JSON.stringify(currentSession));

    window.location.reload(true);
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