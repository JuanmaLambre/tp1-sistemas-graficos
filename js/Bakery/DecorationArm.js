(function(Bakery, Revolution) {

Bakery.DecorationArm = function(params = {}) {

    Revolution.Object3D.call(this);


    this.build = function() {
        this.cyl = new Revolution.Cylinder().build()
        this.cyl.translate([0,8,0])
        this.cyl.scale([2,0.1,0.1])
        this.cyl.rotate(Math.PI/2, [0,0,1])
        this.add(this.cyl)

        var hand = new Revolution.Prism(0.3, 0.05, 0.7).build()
        hand.translate([0,6,0])
        this.add(hand)

        this.finger1 = new Revolution.Prism(0.2, 0.4, 0.05).build()
        this.finger1.translate([0,5.8,1/6])
        this.add(this.finger1)

        this.finger2 = new Revolution.Prism(0.2, 0.4, 0.05).build()
        this.finger2.translate([0,5.8,-1/6])
        this.add(this.finger2)

        this.translate([0,0.9,0])
        this.setColor([0.7,0,0.7])
        return this
    }

    this.closeHand = function(duration, cbObj, method) {
        let anim1 = new Animation(duration, cbObj, method)
        anim1.translate([0,0,-1/12])
        this.finger1.setAnimation(anim1)

        let anim2 = new Animation(duration)
        anim2.translate([0,0,1/12])
        this.finger2.setAnimation(anim2)
    }

    this.openHand = function(duration, cbObj, method) {
        let anim1 = new Animation(duration, cbObj, method)
        anim1.translate([0,0,1/12])
        this.finger1.setAnimation(anim1)

        let anim2 = new Animation(duration)
        anim2.translate([0,0,-1/12])
        this.finger2.setAnimation(anim2)
    }

}

var copyOfParent = Object.create(Revolution.Object3D.prototype); 
copyOfParent.constructor = Bakery.DecorationArm;
Bakery.DecorationArm.prototype = copyOfParent;

}(window.Bakery = window.Bakery || {}, window.Revolution))