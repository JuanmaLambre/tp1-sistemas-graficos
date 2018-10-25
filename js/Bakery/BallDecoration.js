(function(Bakery, Revolution) {

Bakery.BallDecoration = function() {

    Revolution.Object3D.call(this);


    var RADIUS = 0.07

    this.build = function() {
        var sphere = new Revolution.Sphere({radius:RADIUS}).build()
        sphere.setColor([0.9,0.3,0.3])
        sphere.translate([0,0.03,0])

        this.add(sphere)
        return this
    }

}

var copyOfParent = Object.create(Revolution.Object3D.prototype); 
copyOfParent.constructor = Bakery.BallDecoration;
Bakery.BallDecoration.prototype = copyOfParent;

}(window.Bakery = window.Bakery || {}, window.Revolution))