class Cake extends Object3D {

    constructor(params) {
        super()
        let {
            radius,
            height,
            floors,
            waveWidth,
            ringTwists,
            decoration,
            edge,
            edgesCount,
            flavor
        } = params;
        this.height = height
        this.radius = radius
        this.decoration = decoration
        this.edge = edge

        let base = new CakeBase({floors:floors, waveWidth:waveWidth, radius:radius, height:height})
        base.setName("cake base")
        base.setFlavor(flavor)
        this.add(base)
        
        let ring = new CakeRing({twists:ringTwists, radius:radius, flavor:flavor})
        ring.translate([0,base.getHeight(),0])
        this.add(ring)

        let plate = new Plate(radius*1.1)
        plate.setGlossiness(50)
        this.add(plate)

        this.translate([0,plate.getHeight(),0])
    }

    _buildDecoration(str) {
        switch (str.toLowerCase()) {
            case "ball": return new BallDecoration()
            case "cone": return new ConeDecoration()
            case "cookie": return new CookieDecoration()
            default: throw "Decoration unknown: " + str
        }
    }

    _buildEdge(str, height) {
        switch (str.toLowerCase()) {
            case "cylinder": return new EdgeCylinder(height)
            case "prism": return new EdgePrism(height)
            default: throw "Edge unknown: " + str
        }
    }

    addDecoration(angle) {
        let deco = this._buildDecoration(this.decoration)
        deco.translate([5*this.radius/9, this.height, 0])
        let container = new Object3D()
        container.add(deco)
        container.rotate(angle, [0,1,0])
        this.add(container)
    }

    addEdge(angle) {
        let obj = this._buildEdge(this.edge, this.height*1.1)
        obj.translate([this.radius-0.025, 0, 0])
        let container = new Object3D()
        container.add(obj)
        container.rotate(angle, [0,1,0])
        this.add(container)
    }

}