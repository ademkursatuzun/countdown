/**
 *  PrimeFaces Countdown Widget 
 */

PrimeFaces.widget.Countdown = PrimeFaces.widget.BaseWidget.extend({
    init: function(cfg) {
        this._super(cfg);

        alert("Countdown Locale Attr. : <" + this.cfg.locale + "> Test Ok!");

    }
});