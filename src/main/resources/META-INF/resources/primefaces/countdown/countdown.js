/**
 *  PrimeFaces Countdown Widget 
 */

PrimeFaces.widget.Countdown = PrimeFaces.widget.BaseWidget.extend({
    init: function(cfg) {
        this._super(cfg);
        this.isReverse = this.cfg.reverse;

        this.second = 0;
        this.minute = 0;
        this.hour = 0;
        this.day = 0;

        this.updateOutput();
        if (this.cfg.autoStart) {
            this.start();
        }

    },

    refresh: function(cfg) {
        clearInterval(this.interval);
        this.init(cfg);
    },

    start: function() {
        var $this = this;
        this.interval = setInterval(function() {
            $this.updateCounter();
            $this.updateOutput();
        }, 1000);
    },

    stop: function() {
        clearInterval(this.interval);
    },

    formatZero: function(type){
        type = type < 10 ? '0' + type : type;
        return type;
    },  
        
    updateCounter: function() {
        this.getSecond();
        if (this.isReverse && this.day === 0 && this.hour === 0 && this.minute === 0 && this.second === 0) {
            this.stop();
        }
    },

    updateOutput: function() {
        this.jq.text(
            this.formatZero(this.minute) + ":" +
            this.formatZero(this.second)
        ); 
    },

    getSecond: function() {
        if (this.isReverse) {
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
        if (this.isReverse) {
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
        if (this.isReverse) {
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
        if (this.isReverse) {
            if (this.day === 0) {} else {
                this.day = this.day - 1;
            }
        } else {
            this.day = this.day - 1;
        }
    }

});
