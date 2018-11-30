class StraightSweep extends Object3D {

    _average(points) {
        return points[0].map((aux,i) => {
            return points.reduce((acum,x) => {return acum+x[i]}, 0) * 1.0/points.length
        })
    }
        
    constructor(outline, length) {
        super()

        this.position = this._buildPosition(outline, length)
        this.index = revolution.meshIndex(2, outline.length, {close: true})
        this.normal = this._buildNormal(outline)

        let lidfront = new Lid(outline)
        lidfront.translate([0,0,length/2])
        this.add(lidfront)

        let lidback = new Lid(outline)
        lidback.rotate(Math.PI, [0,1,0])
        lidback.translate([0,0,-length/2])
        this.add(lidback)

        this.setColor([0.9,0.9,0.9])

        this.setupWebGLBuffers()
    }

    _buildNormal(outline) {
        let normals = outline.map((p) => {
            return revolution.normalize(p.concat(0))
        })
        return normals.concat(normals)
    }

    _buildPosition(outline, length) {
        let sweep = revolution.sweep(outline, [0,0,length/2], [0,0,-length/2], {steps:1})
        return sweep[0].concat(sweep[1])
    }

}