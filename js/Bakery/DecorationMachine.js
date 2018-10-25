(function(Bakery, Revolution) {

Bakery.DecorationMachine = function(params = {}) {

    Revolution.Object3D.call(this);


    this.build = function() {
        var support = new Revolution.Prism(0.25, 9, 2).build()
        support.translate([-1/8-4,4.5,0])
        support.setColor([0.7,0.4,0.9])
        this.add(support)

        var pedestal = new Revolution.Prism(1, 4, 1).build()
        pedestal.translate([-3.5,2,0])
        pedestal.setColor([0.5,0.2,0.7])
        this.add(pedestal)

        var beam = new Revolution.Prism(5, 1/4, 1).build()
        beam.translate([-1.5,8,0])
        beam.setColor([0.3,0,0.5])
        this.add(beam)

        var arm = new Bakery.DecorationArm().build()
        this.add(arm)

        return this
    }

}

var copyOfParent = Object.create(Revolution.Object3D.prototype); 
copyOfParent.constructor = Bakery.DecorationMachine;
Bakery.DecorationMachine.prototype = copyOfParent;

}(window.Bakery = window.Bakery || {}, window.Revolution))