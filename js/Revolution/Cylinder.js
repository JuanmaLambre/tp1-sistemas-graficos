class Cylinder extends Object3D {

    _buildPosition(steps) {
        let circleTop = [], circleBottom = []
        for (let i = 0; i < steps; ++i) {
            let angle = 2*Math.PI*i/steps
            circleTop.push([-1,Math.sin(angle),Math.cos(angle)])
            circleBottom.push([1,Math.sin(angle),Math.cos(angle)])
        }
        return circleTop.concat(circleBottom)
    }

    _buildIndex(steps) {
        let index = []
        for (let i = 0; i < steps; ++i) {
            index.push(i)
            index.push(i+steps)
        }
        return index.concat([0,steps])
    }

    _buildNormal(steps) {
        let normals = []
        for (let i = 0; i < steps; i++) {
            let angle = 2*Math.PI*i/steps
            normals.push([0,Math.sin(angle),Math.cos(angle)])
        }
        return normals.concat(normals)
    }

    constructor(opts = {}) {
        super()
        var { 
            discretion = 32 
        } = opts
        
        this.position = this._buildPosition(discretion)
        this.index = this._buildIndex(discretion)
        this.setColor([0.9,0.9,0.9])
        this.normal = this._buildNormal(discretion)

        let leftlid = new Circle(discretion)
        leftlid.rotate(-Math.PI/2, [0,1,0])
        leftlid.rotate(Math.PI/2, [1,0,0])
        leftlid.translate([-1,0,0])
        this.add(leftlid)
        let rightlid = new Circle(discretion)
        rightlid.rotate(-Math.PI/2, [0,1,0])
        rightlid.rotate(-Math.PI/2, [1,0,0])
        rightlid.translate([1,0,0])
        this.add(rightlid)

        this.setupWebGLBuffers()
    }

}