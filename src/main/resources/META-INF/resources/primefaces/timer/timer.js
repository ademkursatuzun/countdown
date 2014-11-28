/**
 *  PrimeFaces Timer Widget 
 */

PrimeFaces.widget.Timer = PrimeFaces.widget.BaseWidget.extend({
    init: function(cfg) {
        this._super(cfg);

        this.cfg = cfg;

        this.isCountdown = this.cfg.countdown;

        this.second = 0;
        this.minute = 0;
        this.hour = 0;
        this.day = 0;
        this.matchPattern(this.cfg.finishTime);

        var $this = this;
        this.updateOutput();
        if (this.cfg.autoStart) {
            $this.start();
        }

    },
    refresh: function() {
        clearInterval(this.interval);
        this.init(this.cfg);
        if (this.cfg.autoStart) {
            this.stop();
        }
    },
    start: function() {
        if (!(this.isCountdown && this.day === 0 && this.hour === 0 && this.minute === 0 && this.second === 0)) {
            var $this = this;
            this.interval = setInterval(function() {
                $this.updateCounter();
                $this.updateOutput();
            }, 1000);
        }
    },
    stop: function() {
        clearInterval(this.interval);
    },
    formatZero: function(type) {
        type = type < 10 ? '0' + type : type;
        return type;
    },
    updateCounter: function() {
        this.getSecond();
        if (this.isCountdown && this.day === 0 && this.hour === 0 && this.minute === 0 && this.second === 0) {
            this.stop();
        }
    },
    updateOutput: function() {
        this.jq.text(
                this.formatZero(this.minute) + ":" +
                this.formatZero(this.second)
                );
    },
    matchPattern: function(value) { //TODO improve it.
        var timeList = value.split(":");
        var timeListLength = timeList.length;
        switch (timeListLength) {
            case 1:
                this.second = parseInt(timeList[0]);
                this.minute = 0;
                this.hour = 0;
                this.day = 0;
                break;
            case 2:
                this.second = parseInt(timeList[1]);
                this.minute = parseInt(timeList[0]);
                this.hour = 0;
                this.day = 0;
                break;
            case 3:
                this.second = parseInt(timeList[2]);
                this.minute = parseInt(timeList[1]);
                this.hour = parseInt(timeList[0]);
                this.day = 0;
                break;
            case 4:
                this.second = parseInt(timeList[3]);
                this.minute = parseInt(timeList[2]);
                this.hour = parseInt(timeList[1]);
                this.day = parseInt(timeList[0]);
                break;
            default:
                break;
        }
    },
    getSecond: function() {
        if (this.isCountdown) {
            if (this.second === 0) {
                this.second = 59;
                this.getMinute();
            } else {
                this.second = this.second - 1;
            }
        } else {
            if (this.second === 59) {
                this.second = 0;
                this.getMinute();
            } else {
                this.second = this.second + 1;
            }

        }
    },
    getMinute: function() {
        if (this.isCountdown) {
            if (this.minute === 0) {
                this.minute = 59;
                this.getHour();
            } else {
                this.minute = this.minute - 1;
            }
        } else {
            if (this.minute === 59) {
                this.minute = 0;
                this.getHour();
            } else {
                this.minute = this.minute + 1;
            }

        }
    },
    getHour: function() {
        if (this.isCountdown) {
            if (this.hour === 0) {
                this.hour = 23;
                this.getDay();
            } else {
                this.hour = this.hour - 1;
            }
        } else {
            if (this.hour === 23) {
                this.minute = 0;
                this.getHourDay();
            } else {
                this.hour = this.hour + 1;
            }

        }
    },
    getDay: function() {
        if (this.isCountdown) {
            if (this.day === 0) {
            } else {
                this.day = this.day - 1;
            }
        } else {
            this.day = this.day - 1;
        }
    }

});