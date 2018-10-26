(function(Bakery, Revolution) {

Bakery.ConeDecoration = function() {

    Revolution.Object3D.call(this);

    var HEIGHT = 0.5
    var RADIUS = 0.2

    function buildControl() {
        let x = RADIUS/2
        let y = HEIGHT/5
        return [
            [0,HEIGHT,0], [0,HEIGHT-y,0], [-x,HEIGHT-y,0], [-x,HEIGHT-2*y,0],
            [-x,HEIGHT-3*y,0], [-RADIUS,HEIGHT-3*y,0], [-RADIUS,0,0]
        ]
    }

    this.build = function() {
        var outline = revolution.buildBezier(buildControl())
        outline.push([0,0,0])

        var cone = new Revolution.RevolutionSweep(outline).build()
        cone.scale(0.4)
        cone.setColor([0.2,0.2,0.7])

        this.add(cone)
        return this
    }

}

var copyOfParent = Object.create(Revolution.Object3D.prototype); 
copyOfParent.constructor = Bakery.ConeDecoration;
Bakery.ConeDecoration.prototype = copyOfParent;

}(window.Bakery = window.Bakery || {}, window.Revolution))