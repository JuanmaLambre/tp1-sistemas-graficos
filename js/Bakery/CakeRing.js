(function(Bakery, Revolution) {

Bakery.CakeRing = function(params = {}) {

    Revolution.Object3D.call(this);

    var STAR_RADIUS = 0.0675
    var STAR_POINTS = 6


    function buildStar() {
        var ret = []
        for (var i = 0; i < STAR_POINTS*2; ++i) {
            var angle = i*2*Math.PI/STAR_POINTS
            ret.push([STAR_RADIUS*Math.cos(angle),STAR_RADIUS*Math.sin(angle),0])
            angle += Math.PI/STAR_POINTS
            ret.push([STAR_RADIUS/2*Math.cos(angle),STAR_RADIUS/2*Math.sin(angle),0])
        }
        return ret.concat([[STAR_RADIUS,0,0]])
    }

    this.build = function() {
        var {
            twists = 4,
            radius = 2
        } = params;

        var outline = buildStar()
        var ring = new Revolution.TwistSweep(outline, radius-2*STAR_RADIUS, twists, {steps:64}).build()
        ring.setColor([0.9,0.9,0.9])
        this.add(ring)

        return this
    }

    this.getHeight = function() {
        return STAR_RADIUS*2
    }

}

var copyOfParent = Object.create(Revolution.Object3D.prototype); 
copyOfParent.constructor = Bakery.CakeRing;
Bakery.CakeRing.prototype = copyOfParent;

}(window.Bakery = window.Bakery || {}, window.Revolution))