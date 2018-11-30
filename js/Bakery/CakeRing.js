class CakeRing extends Object3D {

    static get STAR_RADIUS() { return 0.0675 }
    static get STAR_POINTS() { return 6 }
    static get FLAVOR_COLOR() {
        return {
            "chocolate": "b07333",
            "cream": [0.95,0.95,0.75]
        }
    }


    _buildStar() {
        let ret = []
        for (let i = 0; i < CakeRing.STAR_POINTS; ++i) {
            let angle = i*2*Math.PI/CakeRing.STAR_POINTS
            ret.push([CakeRing.STAR_RADIUS*Math.cos(angle),CakeRing.STAR_RADIUS*Math.sin(angle),0])
            angle += Math.PI/CakeRing.STAR_POINTS
            ret.push([CakeRing.STAR_RADIUS/2*Math.cos(angle),CakeRing.STAR_RADIUS/2*Math.sin(angle),0])
        }
        return ret.concat([[CakeRing.STAR_RADIUS,0,0]])
    }

    constructor(params) {
        super()
        let {
            twists = 4,
            radius = 2,
            flavor = cream
        } = params;

        let outline = this._buildStar()
        let ring = new TwistSweep(outline, radius-2*CakeRing.STAR_RADIUS, twists, {steps:64})
        ring.setColor(CakeRing.FLAVOR_COLOR[flavor])
        this.add(ring)
    }

    getHeight() {
        return CakeRing.STAR_RADIUS*2
    }

}
