(function(Bakery, Revolution) {

Bakery.Plate = function(radius) {

    Revolution.Object3D.call(this);

    var HEIGHT = 0.7

    function buildControl(radius) {
        let r = 1/3*radius
        let h = 1/4*HEIGHT
        return [[-radius,HEIGHT,0], [-radius,HEIGHT-h,0], [-r,HEIGHT,0], [-r,0,0]]
    }

    this.build = function() {
        var ctrl = buildControl(radius)
        var outline = revolution.buildBezier(ctrl)
        outline.unshift([0,HEIGHT,0])
        outline.push([0,0,0])

        var p = new Revolution.RevolutionSweep(outline).build()
        p.translate([0,-HEIGHT,0])
        p.setColor([1,1,1])
        this.add(p)

        return this
    }

    this.getHeight = function() {
        return HEIGHT
    }

}

var copyOfParent = Object.create(Revolution.Object3D.prototype); 
copyOfParent.constructor = Bakery.Plate;
Bakery.Plate.prototype = copyOfParent;

}(window.Bakery = window.Bakery || {}, window.Revolution))