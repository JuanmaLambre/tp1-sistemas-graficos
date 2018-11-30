class Circle extends Object3D {

    _buildPosition(steps) {
        let circle = [[0,0,0]]
        for (let i = 0; i < steps; ++i) {
            let angle = 2*Math.PI*i/steps
            circle.push([Math.cos(angle),0,Math.sin(angle)])
        }
        return circle.concat([[1,0,0],[1,0,0]])
    }

    constructor(discretion) {
        super()
        
        this.position = this._buildPosition(discretion)
        this.index = Array.apply(null, {length:discretion+2}).map(Number.call, Number)
        this.normal = this.index.map((x) => {return [0,1,0]})

        this.setColor([0.9,0.9,0.9])
        this.setupWebGLBuffers()
    }

    getDrawMode() {
        return gl.TRIANGLE_FAN
    }

}