(function(Bakery, Revolution) {

Bakery.DecorationMachine = function(decoration) {

    Revolution.Object3D.call(this);

    function buildDecoration(deco) {
        switch (deco) {
            case "ball": return new Bakery.BallDecoration().build()
            case "cone": return new Bakery.ConeDecoration().build()
            case "fruit": return new Bakery.FruitDecoration().build()
            default: throw "Unknown decoration: " + deco
        }
    }

    this.build = function() {
        let support = new Revolution.Prism(0.25, 9, 2).build()
        support.translate([-1/8-4,4.5,0])
        support.setColor([0.7,0.4,0.9])
        this.add(support)

        let pedestal = new Revolution.Prism(1, 4, 1).build()
        pedestal.translate([-3.5,2,0])
        pedestal.setColor([0.5,0.2,0.7])
        this.add(pedestal)

        this.generateDecoration()

        let beam = new Revolution.Prism(5, 1/4, 1.5).build()
        beam.translate([-1.5,8,0])
        beam.setColor([0.3,0,0.5])
        this.add(beam)

        this.arm = new Bakery.DecorationArm().build()
        this.arm.translate([-3.5,0,0])
        this.add(this.arm)

        return this
    }

    this.generateDecoration = function() {
        let decoObj = buildDecoration(decoration)
        decoObj.translate([-3.5,4,0])
        decoObj.setName("decoration")
        this.add(decoObj)
    }

    this.delegateDecoration = function() {
        let deco = this.remove("decoration")
        deco.translate([3.5,1.6,0])
        this.arm.add(deco)
    }

    this.leaveDecoration = function() {
        this.arm.remove("decoration")
    }

    this.setArmAnimation = function(anim) {
        this.arm.setAnimation(anim)
    }

}

var copyOfParent = Object.create(Revolution.Object3D.prototype); 
copyOfParent.constructor = Bakery.DecorationMachine;
Bakery.DecorationMachine.prototype = copyOfParent;

}(window.Bakery = window.Bakery || {}, window.Revolution))