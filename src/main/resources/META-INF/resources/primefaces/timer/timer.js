/**
 *  PrimeFaces Timer Widget 
 */
PrimeFaces.times = {
    'en': {
        day: "day",
        hour: "hour",
        minute: "minute",
        second: "second",
        days: "days",
        hours: "hours",
        minutes: "minutes",
        seconds: "seconds"
    },
    'tr': {
        day: "gün",
        hour: "saat",
        minute: "dakika",
        second: "saniye",
        days: "gün",
        hours: "saat",
        minutes: "dakika",
        seconds: "saniye"
    }

};

PrimeFaces.widget.Timer = PrimeFaces.widget.BaseWidget.extend({

    init: function(cfg) {
        this._super(cfg);

        this.cfg = cfg;

        this.isCountdown = this.cfg.countdown;
        this.mode = this.cfg.mode;

        this.initCons();

        if (this.cfg.value !== "infinite") {
            if (this.isCountdown) {
                this.matchPattern(this.cfg.value);
            } else {
                this.matchPattern(this.cfg.value);
                this.secondf = this.second;
                this.minutef = this.minute;
                this.hourf = this.hour;
                this.dayf = this.day;
                this.initCons();
            }
        }
        this.configureLocale();
        this.started = false;
        var $this = this;
        this.updateOutput();
        if (this.cfg.autoStart) {
            $this.start();
        }
    },
    ////////////////////////////////////Initilaze Constant and Locale ////////////////////////////////////
    initCons: function() {
        this.second = 0;
        this.minute = 0;
        this.hour = 0;
        this.day = 0;
    },
    configureLocale: function() {
        var localeSettings = PrimeFaces.times[this.cfg.locale];
        if (localeSettings) {
            for (var setting in localeSettings) {
                this.cfg[setting] = localeSettings[setting];
            }
        }
    },
    ////////////////////////////////////Display Label ////////////////////////////////////
    start: function() {
        if (!this.started) {
            if (!(this.isCountdown && this.day === 0 && this.hour === 0 && this.minute === 0 && this.second === 0)) {
                var $this = this;
                this.interval = setInterval(function() {
                    $this.updateCounter();
                    $this.updateOutput();
                }, 1000);
            }
            this.started = true;
        }
    },
    refresh: function() {
        clearInterval(this.interval);
        this.init(this.cfg);
        if (this.cfg.autoStart) {
            this.stop();
        }
    },
    stop: function() {
        clearInterval(this.interval);
        this.started = false;
    },

    updateCounter: function() {
        this.getSecond();
        if (!this.isCountdown && this.day === this.dayf && this.hour === this.hourf && this.minute === this.minutef && this.second === this.secondf) {
            this.stop();
        } else if (this.isCountdown && this.day === 0 && this.hour === 0 && this.minute === 0 && this.second === 0) {
            this.stop();
        }
    },
    updateOutput: function() {
        if (this.mode === "simple") {
            this.jq.text(
                this.formatZero(this.day) + ":" +
                this.formatZero(this.hour) + ":" +
                this.formatZero(this.minute) + ":" +
                this.formatZero(this.second));
        } else if (this.mode === "advanced") {
            this.jq.text(
                this.day + " " + this.formatPlular(this.day, this.cfg.day, this.cfg.days) + ", " +
                this.hour + " " + this.formatPlular(this.hour, this.cfg.hour, this.cfg.hours) + ", " +
                this.minute + " " + this.formatPlular(this.minute, this.cfg.minute, this.cfg.minutes) + ", " +
                this.second + " " + this.formatPlular(this.second, this.cfg.second, this.cfg.seconds));
        }
    },

    ///////////////////////////////////Format plular and zero ////////////////////////////////////
    formatPlular: function(val, type, suffix) { //this.second,second,seconds
        val = val > 1 || val === 0 ? suffix : type;
        return val;
    },
    formatZero: function(type) { //this.second
        type = type < 10 ? '0' + type : type;
        return type;
    },
    ////////////////////////////////Split the value ////////////////////////////////////
    matchPattern: function(value) {
        var timeList = value.split(":");
        var timeListLength = timeList.length;
        switch (timeListLength) {
            case 1:
                this.second = parseInt(timeList[0]);
                this.leapTime();
                break;
            case 2:
                this.second = parseInt(timeList[1]);
                this.minute = parseInt(timeList[0]);
                this.leapTime();
                break;
            case 3:
                this.second = parseInt(timeList[2]);
                this.minute = parseInt(timeList[1]);
                this.hour = parseInt(timeList[0]);
                this.leapTime();
                break;
            case 4:
                this.second = parseInt(timeList[3]);
                this.minute = parseInt(timeList[2]);
                this.hour = parseInt(timeList[1]);
                this.day = parseInt(timeList[0]);
                this.leapTime();
                break;
            default:
                break;
        }
    },
    leapTime: function() {
        if (this.second > 59) {
            this.second = (this.second % 60);
            this.minute++;
        }
        if (this.minute > 59) {
            this.minute = (this.minute % 60);
            this.hour++;
        }
        if (this.hour > 59) {
            this.hour = (this.hour % 24);
            this.day++;
        }
    },
    ////////////////////////////  Calculate Second,Minute,Hour and Day ////////////////////////////////////

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
            if (this.day === 0) {} else {
                this.day = this.day - 1;
            }
        } else {
            this.day = this.day - 1;
        }
    },
    fireCompleteEvent: function() {
        if (this.hasBehavior('complete')) {
            this.cfg.behaviors['complete'].call(this);
        }
    },
    hasBehavior: function(event) {
        if (this.cfg.behaviors) {
            return this.cfg.behaviors[event] != undefined;
        }
        return false;
    }

});
