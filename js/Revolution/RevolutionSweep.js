class RevolutionSweep extends Object3D {

    _buildNormals(outline) {
        return outline.map((point,i) => {
            var tg = revolution.minus(
                i == 0 ? point : outline[i-1],
                i == outline.length-1 ? point : outline[i+1]
            )
            return revolution.normalize(revolution.cross_prod([0,0,1],tg))
        })
    }

    constructor(outline, opts = {}) {
        super()
        var {
            steps = 32,
            axis = [0,1,0]
        } = opts

        let grid = revolution.revolve(outline, Math.PI*2/steps, {axis:axis})
        grid.push(outline)
        this.texture = grid.map((outline, i) => {
            return outline.map((x,j) => {
                return [i/(grid.length-1), j/outline.length]
            })
        })
        this.texture = revolution.flattenGrid(this.texture)
        this.position = revolution.flattenGrid(grid)
        this.index = revolution.meshIndex(steps+1, outline.length, {close:true})
        this.setColor([1,1,0])

        let normalOutline = this._buildNormals(outline)
        this.normal = revolution.revolve(normalOutline, Math.PI*2/steps, {axis:axis})
        this.normal.push(normalOutline)
        this.normal = revolution.flattenGrid(this.normal)

        this.setupWebGLBuffers()
    }

}