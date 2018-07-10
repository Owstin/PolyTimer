var formattedTime;

function Timer(elem) {
    var time = 0;
    var interval;
    var offset;

    function update() {
        if (this.isOn) {
            time += delta();
        }

        formattedTime = timeFormatter(time);
        elem.textContent = formattedTime;
    }

    function delta() {
        var now = Date.now();

        var timePassed = now - offset;
        offset = now;
        return timePassed;
    }

    function timeFormatter(timeInMilliseconds) {
        var time = new Date(timeInMilliseconds);
        var minutes = time.getMinutes().toString();
        var seconds = time.getSeconds().toString();
        var milliseconds = Math.floor(time.getMilliseconds().toString() / 10);

        if (milliseconds < 10) {
            milliseconds = '0' + milliseconds;
        }
        
        if (minutes < 1) {
            return seconds + '.' + milliseconds;
        } else {
            if (seconds < 10) {
                return minutes + ':0' + seconds + '.' + milliseconds;
            } else {
                return minutes + ':' + seconds + '.' + milliseconds;
            }
        }
    }

    this.isOn = false;

    this.start = function() {
        if (!this.isOn) {
            interval = setInterval(update.bind(this), 10);
            offset = Date.now();
            this.isOn = true;
        }
    };

    this.stop = function() {
        if (this.isOn) {
            clearInterval(interval);
            interval = null;
            this.isOn = false;
        }
    };

    this.reset = function() {
        time = 0;
        update();
    };
}