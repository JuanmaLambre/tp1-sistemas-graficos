class ConeDecoration extends Object3D {

    static get HEIGHT() { return 0.5 }
    static get RADIUS() { return 0.2 }

    _buildControl() {
        let x = ConeDecoration.RADIUS/2
        let y = ConeDecoration.HEIGHT/5
        return [
            [0,ConeDecoration.HEIGHT,0], [0,ConeDecoration.HEIGHT-y,0],
            [-x,ConeDecoration.HEIGHT-y,0], [-x,ConeDecoration.HEIGHT-2*y,0],
            [-x,ConeDecoration.HEIGHT-3*y,0], [-ConeDecoration.RADIUS,ConeDecoration.HEIGHT-3*y,0], 
            [-ConeDecoration.RADIUS,0,0]
        ]
    }

    constructor() {
        super()
        var outline = revolution.buildBezier(this._buildControl())
        outline.push([0,0,0])

        var cone = new RevolutionSweep(outline)
        cone.scale(0.4)
        cone.setColor([0.2,0.2,0.7])

        this.add(cone)
    }

}