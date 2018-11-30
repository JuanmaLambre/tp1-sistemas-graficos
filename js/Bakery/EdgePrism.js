class EdgePrism extends Object3D {

    static get DEPTH() { return 0.03 }

    constructor(height) {
        super()
        this.height = height

        var e = new Prism(2*EdgePrism.DEPTH, height, EdgePrism.DEPTH)
        e.translate([0,height/2,-EdgePrism.DEPTH/2])
        e.rotate(Math.PI/2, [0,1,0])
        e.setColor("fdf5e6")
        this.add(e)

        return this
    }

}