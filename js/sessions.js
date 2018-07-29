function updateSession() {
    var selectBox = document.getElementById("sessionSelect");
    
    /*if (currentSession > 1 && !selectBox.options[currentSession]) {
        selectBox.add(new Option(seshNames[currentSession], currentSession));
    }*/

    if (localStorage.getItem("currentSession") === null) {
        selectBox.value = "0";
    } else {
        selectBox.value = JSON.parse(localStorage.getItem("currentSession"));
    }
}

function changeSession() {
    var selectBox = document.getElementById("sessionSelect");

    if (selectBox.value == "new") {
        var newSeshName = prompt("Enter your new session name");

        if (newSeshName != "") {
            sessions.push(new Array);
            seshNames.push(newSeshName);
            currentSession = sessions.length-1;

            localStorage.setItem("sessions", JSON.stringify(sessions));
            localStorage.setItem("seshNames", JSON.stringify(seshNames));
            localStorage.setItem("currentSession", JSON.stringify(currentSession));

            window.location.reload(true);
        } else {
            alert("Your session name cannot be blank.");
            selectBox.value = currentSession;
        }
    } else {
        currentSession = Number(selectBox.value);

        localStorage.setItem("sessions", JSON.stringify(sessions));
        localStorage.setItem("seshNames", JSON.stringify(seshNames));
        localStorage.setItem("currentSession", JSON.stringify(currentSession));

        window.location.reload(true);
    }
}

function deleteSession() {
    var delConfirm = confirm("Really delete the current session?");

    if (delConfirm == true) {
        if (sessions.length > 1) {
            sessions.splice(currentSession, 1);
            seshNames.splice(currentSession, 1);

            currentSession = 0;

            localStorage.setItem("sessions", JSON.stringify(sessions));
            localStorage.setItem("seshNames", JSON.stringify(seshNames));
            localStorage.setItem("currentSession", JSON.stringify(currentSession));

            window.location.reload(true);
        } else {
            alert("You can't delete your only session!")
        }
    }
}

function renameSession() {
    var newSeshName = prompt("Enter the new name for \'" + seshNames[currentSession] + "\'");

    if (newSeshName != null) {
        if (newSeshName != "") {
            seshNames.splice(currentSession, 0, newSeshName);

            localStorage.setItem("sessions", JSON.stringify(sessions));
            localStorage.setItem("seshNames", JSON.stringify(seshNames));
            localStorage.setItem("currentSession", JSON.stringify(currentSession));

            window.location.reload(true);
        } else {
            alert("Your session name canot be blank.");
        }
    }
}