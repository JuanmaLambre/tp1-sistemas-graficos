(function(Bakery, Revolution) {

Bakery.EdgeMachine = function(edge, height) {

    Revolution.Object3D.call(this);


    function buildEdge(edge, height) {
        switch(edge) {
            case "cylinder": return new Bakery.EdgeCylinder(height).build()
            case "prism": return new Bakery.EdgePrism(height).build()
            default: throw "Unknown edge: " + edge
        }
    }


    this.build = function() {
        var support = new Revolution.Prism(1, 6, 1).build()
        support.translate([-2.5,3,0])
        support.setColor([0.7,0.4,0.9])
        this.add(support)

        this.arm = new Bakery.EdgeArm().build()
        this.arm.translate([-0.5,0,0])
        this.add(this.arm)
        
        this.generateEdge()

        return this
    }

    this.generateEdge = function() {
        let edgeDeco = buildEdge(edge, height*1.1)
        this.arm.addEdge(edgeDeco)
    }

    this.removeEdge = function() {
        return this.arm.removeEdge()
    }

    this.setArmAnimation = function(anim) {
        this.arm.setAnimation(anim)
    }

}

var copyOfParent = Object.create(Revolution.Object3D.prototype); 
copyOfParent.constructor = Bakery.EdgeMachine;
Bakery.EdgeMachine.prototype = copyOfParent;

}(window.Bakery = window.Bakery || {}, window.Revolution))