(function(Bakery, Revolution) {

Bakery.EdgeArm = function() {

    Revolution.Object3D.call(this);


    this.build = function() {
        this.bar = new Revolution.Prism(1, 0.25, 0.25).build()
        this.bar.translate([-1.5,4.5,0])
        this.bar.setColor([0.7,0.6,0.2])
        this.add(this.bar)

        let hand = new Revolution.Prism(0.05, 0.5, 0.5).build()
        hand.translate([-1,4.5,0])
        hand.setColor([0.9,0.8,0.4])
        this.add(hand)

        return this
    }

    this.addEdge = function(edge) {
        edge.translate([-0.92,4.2,0])
        edge.setName("deco")
        this.add(edge)
    }

    this.removeEdge = function() {
        return this.remove("deco")
    }

}

var copyOfParent = Object.create(Revolution.Object3D.prototype); 
copyOfParent.constructor = Bakery.EdgeArm;
Bakery.EdgeArm.prototype = copyOfParent;

}(window.Bakery = window.Bakery || {}, window.Revolution))