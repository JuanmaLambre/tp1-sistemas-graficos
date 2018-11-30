class Plate extends Object3D {

    static get HEIGHT() { return 0.7 }

    _buildControl(radius) {
        let r = 1/3*radius
        let h = 1/4*Plate.HEIGHT
        return [[-radius,Plate.HEIGHT,0], [-radius,Plate.HEIGHT-h,0], [-r,Plate.HEIGHT,0], [-r,0,0]]
    }

    constructor(radius) {
        super()
        
        var ctrl = this._buildControl(radius)
        var outline = revolution.buildBezier(ctrl)
        outline.unshift([0,Plate.HEIGHT,0])
        outline.push([0,0,0])

        var p = new RevolutionSweep(outline)
        p.translate([0,-Plate.HEIGHT,0])
        p.setColor([1,1,1])
        this.add(p)
    }

    getHeight() {
        return Plate.HEIGHT
    }

}