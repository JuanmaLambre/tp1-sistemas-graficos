(function(Bakery, Revolution) {

Bakery.Cake = function(params = {}) {

    Revolution.Object3D.call(this);


    function buildDecoration(str) {
        switch (str.toLowerCase()) {
            case "ball": return new Bakery.BallDecoration().build()
            case "cone": return new Bakery.ConeDecoration().build()
            case "fruit": return new Bakery.FruitDecoration().build()
            default: throw "Decoration unknown: " + str
        }
    }

    function buildEdge(str, height) {
        switch (str.toLowerCase()) {
            case "cylinder": return new Bakery.EdgeCylinder(height).build()
            case "prism": return new Bakery.EdgePrism(height).build()
            default: throw "Edge unknown: " + str
        }
    }


    this.build = function() {
        var {
            radius,
            height,
            floors,
            waveWidth,
            ringTwists,
            decoration,
            edge,
            edgesCount,
            flavor = "cream"
        } = params;
        this.height = height

        var base = new Bakery.CakeBase({floors:floors, waveWidth:waveWidth, radius:radius, height:height}).build()
        base.setFlavor(flavor)
        this.add(base)
        
        var ring = new Bakery.CakeRing({twists:ringTwists, radius:radius}).build()
        ring.translate([0,base.getHeight(),0])
        this.add(ring)

        var plate = new Bakery.Plate(radius*1.1).build()
        this.add(plate)

        this.translate([0,plate.getHeight(),0])

        return this
    }

    this.addDecoration = function(angle) {
        let deco = buildDecoration(params.decoration)
        deco.translate([5*params.radius/9, params.height, 0])
        let container = new Revolution.Object3D()
        container.add(deco)
        container.rotate(angle, [0,1,0])
        this.add(container)
    }

    this.addEdge = function(angle) {
        let obj = buildEdge(params.edge, params.height*1.1)
        obj.translate([params.radius, 0, 0])
        let container = new Revolution.Object3D()
        container.add(obj)
        container.rotate(angle, [0,1,0])
        this.add(container)
    }

}

var copyOfParent = Object.create(Revolution.Object3D.prototype); 
copyOfParent.constructor = Bakery.Cake;
Bakery.Cake.prototype = copyOfParent;

}(window.Bakery = window.Bakery || {}, window.Revolution))