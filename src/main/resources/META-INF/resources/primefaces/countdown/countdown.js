/**
 *  PrimeFaces Countdown Widget 
 */

PrimeFaces.widget.Countdown = PrimeFaces.widget.BaseWidget.extend({

init: function(cfg) {
    this._super(cfg);
    
    this.cfg.pattern = this.cfg.pattern;
    alert("countdown");
    console.log(this.cfg.pattern);
    
}
});