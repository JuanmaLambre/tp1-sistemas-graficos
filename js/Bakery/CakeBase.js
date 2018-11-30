class CakeBase extends Object3D {

    static get DEFAULT_HEIGHT() { return 0.7 }
    static get FLAVOR_FILENAMES() { 
        return {
            "cream": "maps/crema.jpg",
            "chocolate": "maps/chocolate.jpg"
        }
    }

    constructor(params) {
        super()
        this.height = params.height

        let control = this._buildControlPoints(params)
        let points = revolution.buildBSpline2(control, 8)

        let obj = new RevolutionSweep(points)
        obj.setGlossiness(100)
        obj.setName("base")
        this.add(obj)
        this.setColor([0.8,0.8,0.1])
    }

    setFlavor(flavor) {
        this.getChild("base").loadTexture(CakeBase.FLAVOR_FILENAMES[flavor])
    }

    getHeight() {
        return this.height || CakeBase.DEFAULT_HEIGHT
    }


    _buildControlPoints(params) {
        let {
            floors = 3,
            waveWidth = 0.125,
            radius = 1,
            height = CakeBase.DEFAULT_HEIGHT
        } = params

        let points = [[0,height,0],[0,height,0],[-radius+waveWidth,height,0]]
        let yDelta = height/(2*floors)

        for (let i = 0; i < floors; ++i) {
            points.push([-radius,height-(i*2+1)*yDelta,0])
            points.push([-radius+waveWidth,height-(i*2+2)*yDelta,0])
        }

        return points.concat([[0,0,0],[0,0,0]])
    }

}