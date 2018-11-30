class TwistSweep extends Object3D {

    constructor(outline, radius, twists, opts={}) {
        super()
        var {
            steps = 32,
            angle = 2*Math.PI,
            close = true
        } = opts

        this.position = revolution.revolve_twisted(outline, radius, twists, angle/steps, {angle:angle})
        this.position = revolution.flattenGrid(this.position)
        this.index = revolution.meshIndex(steps, outline.length, {close:close})
        this.color = this.position.map((x,i) => {
            return revolution.normalize(x)
        })
        this.normal = revolution.revolve_twisted(outline, 0, twists, angle/steps, {angle:angle})
        this.normal = revolution.flattenGrid(this.normal).map((n) => {
            return revolution.normalize(n)
        })

        this.setupWebGLBuffers()
    }

}