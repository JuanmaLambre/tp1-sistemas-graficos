(function(Bakery, Revolution) {

Bakery.EdgeArm = function(params = {}) {

    Revolution.Object3D.call(this);


    this.build = function() {
        var bar = new Revolution.Prism(1, 0.25, 0.25).build()
        bar.translate([-1.5,4.5,0])
        bar.setColor([0.7,0.6,0.2])
        this.add(bar)

        var hand = new Revolution.Prism(0.05, 0.5, 0.5).build()
        hand.translate([-1,4.5,0])
        hand.setColor([0.9,0.8,0.4])
        this.add(hand)

        return this
    }

}

var copyOfParent = Object.create(Revolution.Object3D.prototype); 
copyOfParent.constructor = Bakery.EdgeArm;
Bakery.EdgeArm.prototype = copyOfParent;

}(window.Bakery = window.Bakery || {}, window.Revolution))