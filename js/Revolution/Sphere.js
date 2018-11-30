class Sphere extends Object3D {

    constructor(opts) {
        super()
        var { 
            radius = 1,
            discretion = 16
        } = opts

        var semicircle = revolution.semicircle(radius, {steps:discretion})
        var s = new RevolutionSweep(semicircle, {steps:discretion, axis:[1,0,0]})
        s.setName("sphere")

        this.add(s)
    }

}