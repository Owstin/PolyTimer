var timer = document.getElementById('timer');
var inspecting = false;

function Inspection() {
    var interval = null;
    var seconds = 15;
    
    function update() {
        if (inspecting == true) {
            seconds--;
            if (seconds > -1) {timer.textContent = seconds;}
            else {
                if (seconds < -3) {timer.textContent = "DNF";}
                else {timer.textContent = "+2";}
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