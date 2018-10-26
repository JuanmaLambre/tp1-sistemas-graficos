(function(Bakery, Revolution) {

Bakery.DecorationArm = function(params = {}) {

    Revolution.Object3D.call(this);


    this.build = function() {
        var cyl = new Revolution.Cylinder().build()
        cyl.scale([0.15,1,0.15])
        cyl.translate([0,7,0])
        cyl.rotate(Math.PI/2, [0,0,1])
        this.add(cyl)

        var hand = new Revolution.Prism(0.5, 0.05, 1).build()
        hand.translate([0,6,0])
        this.add(hand)

        var finger1 = new Revolution.Prism(0.5, 0.4, 0.05).build()
        finger1.translate([0,5.8,1/6])
        this.add(finger1)

        var finger2 = new Revolution.Prism(0.5, 0.4, 0.05).build()
        finger2.translate([0,5.8,-1/6])
        this.add(finger2)

        this.setColor([0.7,0,0.7])
        return this
    }

}

var copyOfParent = Object.create(Revolution.Object3D.prototype); 
copyOfParent.constructor = Bakery.DecorationArm;
Bakery.DecorationArm.prototype = copyOfParent;

}(window.Bakery = window.Bakery || {}, window.Revolution))