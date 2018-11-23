(function(Bakery, Revolution) {

Bakery.EdgePrism = function(height) {

    Revolution.Object3D.call(this);


    var DEPTH = 0.03

    this.build = function() {
        this.height = height
        var e = new Revolution.Prism(2*DEPTH, height, DEPTH).build()
        e.translate([0,height/2,-DEPTH/2])
        e.rotate(Math.PI/2, [0,1,0])
        e.setColor([0.7,0.7,0.9])
        this.add(e)

        return this
    }

}

var copyOfParent = Object.create(Revolution.Object3D.prototype); 
copyOfParent.constructor = Bakery.EdgePrism;
Bakery.EdgePrism.prototype = copyOfParent;

}(window.Bakery = window.Bakery || {}, window.Revolution))