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
            decorationsCount,
            edge,
            edgesCount
        } = params;

        var base = new Bakery.CakeBase({floors:floors, waveWidth:waveWidth, radius:radius, height:height}).build()
        this.add(base)
        
        var ring = new Bakery.CakeRing({twists:ringTwists, radius:radius}).build()
        ring.translate([0,base.getHeight(),0])
        this.add(ring)

        for (var i = 0; i < decorationsCount; i++) {
            let deco = buildDecoration(decoration)
            let angle = i*2*Math.PI/decorationsCount
            deco.rotate(angle, [0,1,0])
            deco.translate([5*radius/9,base.getHeight(),0])
            this.add(deco)
        }

        for (var i = 0; i < edgesCount; i++) {
            let obj = buildEdge(edge, base.getHeight()*1.1)
            obj.rotate(i*2*Math.PI/edgesCount, [0,1,0])
            obj.translate([radius,0,0])
            this.add(obj)
        }

        var plate = new Bakery.Plate(radius*1.1).build()
        this.add(plate)

        this.translate([0,plate.getHeight(),0])

        return this
    }

}

var copyOfParent = Object.create(Revolution.Object3D.prototype); 
copyOfParent.constructor = Bakery.Cake;
Bakery.Cake.prototype = copyOfParent;

}(window.Bakery = window.Bakery || {}, window.Revolution))