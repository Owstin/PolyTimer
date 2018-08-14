var timer = document.getElementById('timer');
var inspecting = false;

var male8 = new Audio('snd/male_8sec.wav');
var male12 = new Audio('snd/male_12sec.wav');
var female8 = new Audio('snd/female_8sec.wav');
var female12 = new Audio('snd/female_12sec.wav');

function Inspection() {
    var interval = null;
    var seconds = 15;
    
    function update() {
        if (inspecting == true) {
            seconds--;
            if (seconds > -1) {timer.textContent = seconds;}
            else {
                if (seconds < -2) {timer.textContent = "DNF";}
                else {timer.textContent = "+2";}
            }

            if (warningAudio == true) {
                if (seconds == 8) {
                    if (warningVoice == "male") {male8.play();}
                    if (warningVoice == "female") {female8.play();}
                }

                if (seconds == 3) {
                    if (warningVoice == "male") {male12.play();}
                    if (warningVoice == "female") {female12.play();}
                }
            }
        }
    }
    
    this.start = function() {
        interval = setInterval(update.bind(this), 1000);
        timer.textContent = "15";
        timer.style.color = "#FFF";
        seconds = 15;
        inspecting = true;
    }
    
    this.stop = function() {
      clearInterval(interval);
      inspecting = false;
      seconds = 15;
    }
}