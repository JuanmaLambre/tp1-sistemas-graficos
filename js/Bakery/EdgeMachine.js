(function(Bakery, Revolution) {

Bakery.EdgeMachine = function(params = {}) {

    Revolution.Object3D.call(this);


    this.build = function() {
        var support = new Revolution.Prism(1, 6, 1).build()
        support.translate([-2.5,3,0])
        support.setColor([0.7,0.4,0.9])
        this.add(support)

        this.arm = new Bakery.EdgeArm().build()
        this.add(this.arm)

        return this
    }

    this.setArmAnimation = function(anim) {
        this.arm.setAnimation(anim)
    }

}

var copyOfParent = Object.create(Revolution.Object3D.prototype); 
copyOfParent.constructor = Bakery.EdgeMachine;
Bakery.EdgeMachine.prototype = copyOfParent;

}(window.Bakery = window.Bakery || {}, window.Revolution))